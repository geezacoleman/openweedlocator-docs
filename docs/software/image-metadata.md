# Image metadata (EXIF)

Every image the OWL records carries metadata describing how and where it was
taken. This matters because recorded images are usually destined for a dataset:
without the settings that produced a detection, a frame is a picture rather than
a measurement.

Metadata is written to **every** saved image, including the cropped images
produced by the `bbox` and `square` sample methods.

## What is recorded

**Time.** `DateTimeOriginal`, `DateTimeDigitized` and `DateTime`, plus
sub-second precision and the UTC offset. The timestamp is taken at the moment
the frame is captured, not when the file is written. This is the field most
photo tools show as "Date taken".

**Camera.** Sensor make and model, exposure time, ISO equivalent (from analogue
and digital gain) and focus distance where the lens reports it. The complete raw
camera metadata is also stored verbatim, so nothing is lost.

**Detection settings.** The algorithm and the thresholds it ran with: excess
green bounds, hue, saturation and brightness ranges, minimum weed size,
sensitivity level, painted profile, and model confidence for in-crop detection.
These are what make a frame reproducible.

**Position.** Latitude, longitude, altitude, speed, heading, satellite count and
accuracy, plus the satellite date and time, whenever a fix is available.

**Session.** The recording session identifier and start time, so a file remains
traceable after it has been copied out of its folder, together with any field
name, crop, weather and vehicle entered on the dashboard before recording.

**Region.** For cropped images, the source frame dimensions and the position and
size of the crop within it, recorded as `source_width`/`source_height` and
`roi_x`/`roi_y`/`roi_width`/`roi_height`. Note that the session field named
`crop` is the crop you are growing; the image region uses the `roi_` prefix.

## Missing values are omitted, never invented

If the OWL has no satellite fix, no position tags are written at all. If the
camera does not report exposure, no exposure tag is written. A field is never
filled with a zero or an empty string to keep the structure tidy, because an
invented coordinate or exposure silently corrupts a dataset.

The same applies to size limits. The free-text fields are capped so that the
structured tags always fit; if a field would overflow, the least important keys
are dropped and a `metadata_truncated` marker is added, rather than discarding
the whole field.

## Set the timezone

Date tags are written in local time with the offset recorded alongside. If the
unit's timezone has never been set it will be UTC, and photo tools that ignore
the offset will show times shifted by however far you are from Greenwich.

```bash
sudo timedatectl set-timezone Pacific/Auckland
```

The phone app sets the timezone for you when it syncs the clock.

Raspberry Pi boards have no battery-backed clock. A unit that has never reached
a time server or a phone will have an inaccurate clock, and the date tag will
reflect that. When a satellite fix is present the satellite date and time are
recorded separately and remain correct regardless, so they are the reliable
cross-check.

## Checking an image

```bash
exiftool -DateTimeOriginal -OffsetTimeOriginal -GPSDateStamp \
         -GPSLatitude -GPSLongitude -ImageDescription image.jpg
```

On Windows, right-click the file, choose Properties, then Details, and look for
"Date taken".
