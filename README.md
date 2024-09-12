
# Lift Simulation Web App

This project simulates the mechanics of a lift system, allowing users to input the number of floors and lifts, and then interact with an interface to call lifts to different floors.

## Features

1. **Dynamic Lift and Floor Input**: Users can specify the number of floors and lifts they want to simulate, and the interface dynamically generates the layout.
2. **Interactive Lift Buttons**: Each floor has buttons (up and down) that can be clicked to call a lift. Lifts move to the requested floor, and only one lift is dispatched per request.
3. **Lift Doors**: The lift doors open after 2.5 seconds and close after another 2.5 seconds.
4. **Lift Movement Speed**: Lifts move at a speed of 2 seconds per floor.
5. **Responsive Design**: The web app is mobile-friendly, ensuring a smooth user experience on smaller screens.

## How to Use

1. Enter the number of floors and lifts in the input form.
2. Click "Generate" to create the layout.
3. Use the "Up" and "Down" buttons on each floor to call a lift.
4. The nearest available lift will move to the requested floor.

## Technologies Used
- HTML
- CSS
- JavaScript (Vanilla)

## Feature Improvements

- **Multiplayer functionality:** Allow multiple users to control lifts simultaneously.
- Optimize lift selection to minimize wait times.
- Add sound effects for lift doors and movement.
- Enhance the UI with floor number displays inside lifts.
