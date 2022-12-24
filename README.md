# node-red-contrib-nissan-leaf

A NodeRED module which allows one to remotely control a nissan leaf.
    
The module is based upon the excellent https://github.com/Alheimsins/leaf-connect.

Currently there are only 2 operations supported:

| msg.payload | Description |
| --------------- | --------------- |  
|  climate_control_on | Turns on the climate control |
|  climate_control_off | Turns off the climate control |
|  climate_control_status | Gets the current climate control status |
|  status | Returns the status of the car |
|  cached_status | Returns the cached status of the car |

This is very much a work in progress and additional operations will be added over time.