# simplestepcounter
This will be a simple mobile app made from React Native that will count steps as the user walks or runs.
This app also has a timelapse function where for now, can be manually set via the code, where we can set a specific time or day to achieve our goal.

This app consist of 3 parts namely the step counter, the circular bar and the timer.

Step Counter - Pedometer.isAvailableAsync() is a function used to detect the sensor in the smartphone which also helps the step counter to count when there is movement. In the package, expo-sensors are used to call/activate the sensors where to enable it to work with the code and allow the step counter to work. 

Circular Bar - This function shows progress if there is motion by the user. CircularProgress progress={this.state.currentStepCount} is the function used to correlate the progress and the movement of the user.

Timer - var diffr = moment.duration(moment(expirydate).diff(moment(date))); is used to subtract the deadline with the current date to shoe the time remaining to achieve the goal.


