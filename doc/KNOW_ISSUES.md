# Know issues

Retrieve here the list of know issues

- Changing settings on config tab may not be take in considaration on skin
    - Current solution: Relaunch app
- ~~Wrong timestamp for job delivery time (and remaining delivery time) on World of Trucks~~
    - Cause: The timestamp provider by the API was wrong. And then, the estimated remaining delivery time was wrong too
    - Solution: Check [here](https://github.com/JAGFx/ets2-dashboard-skin/issues/33#issuecomment-725514001) for an explaination. A correction will be added for WOT job soon.
- ~~App crash or the updating of data was not fluent~~
    - Cause: Memory leak on telemetry data update
    - Solution: Fixed on #35
- ~~Desyncing data on dashboard (All data may be updated with a delay)~~
  - Cause: If CPU was over used, this delay may be more fat
  - Solution: No more problem now. #41
- May dosen't work with some Apple mobile device
  - Cause: Unknown
  - Solution: No solution yet
- App freeze sometime (Mobile device only)
  - Cause: Unknown
  - Solution: Top on screen to reactivate it #41
- Job Information Disappears when using Eurotunnel #47
  - Cause: It's seem be an SCS SDK issue
  - Solution: Pending correction from RenCloud
- Next rest time and reamining time bad #46
  - Cause: See [here](https://github.com/JAGFx/ets2-dashboard-skin/issues/33#issuecomment-725514001)
  - Solution: No solution yet

---
↩️ [Home](../README.md)
