# Hiking pace calculator

A web application that helps you plan your daily mileage for a long distance hike. The calculator lets you break down your hike into customizable phases. Typically, you'd start your hike with shorter days and increase the mileage as you get your "trail legs". When you're a stronger hiker, you can hike longer days.

The calculator automatically sets the average mileage for the remaining days on your hike based on your inputs.

## Demo

https://new2code.github.io/hiking-pace-calculator/

## Features

- Basic inputs for:
  - Total distance (in miles)
  - Total time (in days)
  - Number of zero-mile days
- Custom hiking phases where you can specify:
  - Number of days for each phase
  - Target daily mileage for each phase
- Color-coded results showing:
  - Different phases in rainbow progression
  - Remaining days after defined phases
- Automatic distribution of remaining mileage

## Files

- **index.html**: Main HTML structure
- **styles.css**: CSS styling with phase-specific colors
- **app.js**: JavaScript logic for phase calculations

## Local development setup

1. Clone the repository:
   ```
   git clone https://github.com/new2code/hiking-pace-calculator.git
   ```

2. Navigate to the project directory:
   ```
   cd hiking-pace-calculator
   ```

3. Install the dependencies: 
   ```
   npm install
   ```
   
4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and visit:
   ```
   http://localhost:8080
   ```

## Usage

1. Enter your hike's basic information:
   - Total distance
   - Total time
   - Number of zero-mile days

2. Define your hiking phases:
   - Click "Add phase" for each phase
   - For each phase, specify:
     - Number of days
     - Target daily mileage
   - Remove phases as needed

3. Click "Calculate" to see:
   - Average daily mileage
   - Day-by-day breakdown
   - Color-coded phases

## Example

A 100-mile hike over 14 days might have phases like:
- Phase 1: 5 days at 5 miles per day
- Phase 2: 5 days at 8 miles per day
- Remaining days: Automatically calculated to complete the distance

## License

MIT License
