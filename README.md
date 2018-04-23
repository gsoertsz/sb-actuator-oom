# Spring boot, Jersey, Actuator, out of memory issue

# Instructions for use

## Pre-requisites

* Docker
* npm/node
* Visual VM (for visibility into threads, overall heap usage (time-domain) and occupancy (heap sampling)

## Build the app

```
%> ./build.sh
```

## Run the app

```
%> docker-compose down && docker-compose up
```

# Observations

Once the app is running it doesn't take long to crash with the following observables

# Screenshots

![Top of Heap at Crash](images/HeapSampleMetricsEnabled.png)
![Heap Usage leading up to Crash](images/HeapUsageOverTime.png)
![Console output at Crash](images/OutOfMemoryOnConsole.png)
