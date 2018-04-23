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

Below captures the largest heap occupiers

![Top of Heap at Crash](images/HeapSampleMetricsEnabled.png)

Below captures the heap growth and GC/CPU activity over time

![Heap Usage leading up to Crash](images/HeapUsageOverTime.png)

What we see on the console

![Console output at Crash](images/OutOfMemoryOnConsole.png)
