const fs = require('fs');

const inputFile = 'Pl.json';
const outputFile = 'players_transformed.json';

// Read and parse the input JSON file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  let parsedData;
  try {
    parsedData = JSON.parse(data);
  } catch (err) {
    console.error('Error parsing JSON:', err);
    return;
  }

  const players = [];

  // Transform the data
  (parsedData.teams || []).forEach(team => {
    (team.players || []).forEach(player => {
      const playerDoc = {
        team_id: team._id,
        team_name: team.name,
        player_name: player.name,
        country: player.country,
        position: player.position,
        goals: player.GA ? player.GA.goals : null,
        assists: player.GA ? player.GA.assists : null,
        matchRating: player.matchRating,
        aerialsWon: player.aerialsWon
      };
      players.push(playerDoc);
    });
  });

  // Write the transformed data to a new file
  fs.writeFile(outputFile, JSON.stringify(players, null, 2), 'utf8', err => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }
    console.log('Data successfully transformed and written to', outputFile);
  });
});
