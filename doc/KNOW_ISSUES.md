# Know issues

Retrieve here the list of know issues

- Changing settings on config tab may not be take in considaration on skin
    - Current solution: Relaunch app
- Wrong timestamp for job delivery time (and remaining delivery time) on World of Trucks
    - Cause: The timestamp provider by the API was wrong. And then, the estimated remaining delivery time was wrong too
    - Solution: Add support for SCS SDK 1.10.6 #33
- ~~App crash or the updating of data was not fluent~~
    - Cause: Memory leak on telemetry data update
    - Solution: Fixed on #35
- Desyncing data on dashboard (All data may be updated with a delay)
    - Cause: If CPU was over used, this delay may be more fat
    - Solution: No solution yet.
- May dosen't work with some Apple mobile device
    - Cause: Unknown
    - Solution: No solution yet

---
↩️ [Home](../README.md)
