# node-red-contrib-nissan-leaf

A NodeRED module which allows one to remotely control a nissan leaf.
    
The module is based upon the excellent https://github.com/Alheimsins/leaf-connect.

Currently there are only 2 operations supported:

| msg.payload | Description |
| --------------- | --------------- |  
|  climate_control_on | Turns on the climate control |
|  climate_control_off | Turns off the climate control |

This is very much a work in progress and additional operations will be added over time.