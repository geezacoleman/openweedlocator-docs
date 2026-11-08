# How the OWL decides to spray

From version 3.27 the OWL decides what its nozzles do in one place, using fixed rules. This page sets those rules out. They are product decisions, not implementation details: change them only on purpose, and update this page when you do.

```{important}
**Fail-safe does not mean "fail off".** Turning the nozzles off whenever something is uncertain sounds safe, but it is not always safe and it is often just annoying. A farmer who chose blanket spraying on a fault gets an untreated strip instead. A rig that comes back from a reboot sprays nothing until someone notices. An OWL that stops when the phone goes to sleep cannot be left to work on its own. The rules below say exactly when the OWL stops, when it keeps going, and that it always says why.
```

## The rules

### 1. Faults follow `on_error`

`[System] on_error` in the configuration is the farmer's choice. It applies to every spraying fault: the camera stops sending frames for more than 1 s, dashboard and switch control or the detection loop stops responding, or a relay is stuck on.

| `on_error` | Detection can still run (for example a stuck relay) | Detection cannot run (camera lost) |
|------------|------------------------------------------------------|------------------------------------|
| `off` (default) | All nozzles off | All nozzles off |
| `on` | Spot spraying continues | Blanket spray while spraying is switched on |

The fault always shows on the status LED, the dashboards and the phone app, whichever value is chosen. A lost camera is re-opened every 5 s. With `on`, spot spraying returns by itself when frames come back. With `off`, the OWL restarts itself after 3 failed attempts.

### 2. The hardware switch against the screen

- A Ute or Advanced spray switch set to **off** always wins. No dashboard, app or controller command can spray, and that includes blanket spraying.
- Switching it **on** starts spot spraying. While it is on, the dashboard or app can choose spot, blanket or off.
- A Ute switch that is on at power-up sprays.
- **Hold to spray** and the **nozzle test** still work with the switch off. Each is limited to 10 s.

### 3. A standalone OWL and its phone

The phone or tablet is a remote, not a lifeline. If it leaves, goes to sleep or switches to another app, nothing changes: the OWL carries on with what it was doing.

The one exception is hold to spray. It is a lease held by the OWL. The screen renews it every second, and the OWL turns the nozzles off by itself 1.5 s after the last renew, and after 10 s at most. A phone that walks out of range in the middle of a hold cannot leave the nozzles on.

### 4. A networked OWL and its controller

- **The OWL follows the controller screen, always.** After a reconnect, a reboot or a cleared fault, it is put back to what the screen shows. If a command is lost on a weak link, it is sent again (at most every 4 s). After 3 sends with no answer, the OWL's card says "Not responding to commands".
- **Stop all is respected**, including by OWLs that were offline when it was pressed.
- **Losing the controller:** after 5 s with no word from the controller, the OWL raises a `link_lost` fault (status LED code 8).
  - Spot spraying always continues.
  - Blanket spraying stops if `on_error = off` and keeps going if `on_error = on`.
- **When an OWL stops by itself**, the screen follows the OWL rather than restarting it. This covers setup, its own switch set to off, a fault, or a link-loss blanket stop. Its button shows off, with the reason. If someone flips the OWL's own switch, the screen follows that too.

### 5. Spraying never restarts by itself

The OWL forgets a spray request whenever something stops spraying:

- first-boot setup
- the spray switch going off
- a fault while `on_error = off`
- a link-loss blanket stop (networked OWLs)

A person has to press Start, or flip the switch, to spray again. The dashboards and the app say why spraying stopped, for example "Spraying stopped: camera fault. Press Start to spray again." In a cab with no screen, a Ute or Advanced status LED flashes code 9 while the spray switch is still on after such a stop: switch it off and on again to spray. A fault's own code flashes first. A request made during first-boot setup is refused, not saved for later.

### 6. Shutdown and crashes

- On a normal stop the nozzles go off first, before anything slow.
- After any exit (including a crash or `kill -9`), `owl.service` drives the relay pins it used low (`ExecStopPost`, `tools/relays_off.py`). Units installed before 3.27 get this the next time `owl_setup.sh` runs.

## Priority, highest first

When several things apply at once, the first one in this list decides:

1. First-boot setup: off
2. The hardware switch set to off: off
3. Any fault, with `on_error = off`: off
4. Lost controller during blanket spraying, with `on_error = off`: off
5. A fault that stops detection, with `on_error = on`, while spraying is asked for: blanket
6. Otherwise: what the operator asked for (off, spot or blanket)

Hold to spray and the nozzle test are not in this list. They are time-limited tests that run on top of it, and they stop for first-boot and for faults while `on_error = off`.

## For developers

- The list above is `utils/spray_mode.py` `resolve()`. It is the only place these rules live. `owl.py` `_apply_spray()` applies the result, and `RelayController.set_mode()` is the only code that switches nozzles. Never call the relays' `all_on()` or `all_off()` from anywhere else.
- Every request (dashboard, app, controller, agent, switch) goes through `Owl.request_spray()`. Hold to spray goes through `Owl.hold_spray()`.
- `tests/unit/test_spray_mode.py` checks every combination of inputs against these rules, and `tests/owl/test_spray_owner.py` checks them on a real OWL. If one of those tests fails, the code has drifted from this page. Fix the code, unless the rule itself was changed on purpose, in which case update this page too.
- The MQTT `spray` and `faults` state fields are described in [Wireless control](../controllers/wireless/index.md).
