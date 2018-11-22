import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button} from 'react-native';
import { MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
    }
  }

  componentMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ], 
      currentPlayer: 1,
    });
  }

  getWinner =  () => {
    let sum;
    const NUM_TILES = 3;
    let arr = this.state.gameState;

    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if ( sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if ( sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum ==3 ) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum ==3 ) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    return 0;
  }

  onTilePress = (row, col) => {
    let value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    let currentPlayer = this.state.currentPlayer;

    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    let nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    let winner = this.getWinner();
    if (winner == 1) {
      Alert.alert('Jugador 1 es el ganador');
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert('Jugador 2 es el ganador');
      this.initializeGame();
    }
  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  renderIcon = (row,col) => {
    let value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name="bug" style={styles.tileX}/>;
      case -1: return <Icon name="shield" style={styles.tileO}/>
      default: return <View/>;
    }
  }

  render() {
    return (
      <View style={styles.container}>

         <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(0,0)}  style={[styles.tile,{borderLeftWidth: 0, borderTopWidth: 0}]}>
           {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.tile,{borderTopWidth: 0}]}>
            {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.tile,{borderTopWidth: 0, borderRightWidth: 0}]}>
            {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.tile,{borderLeftWidth: 0}]}>
            {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={[styles.tile,{}]}>
            {this.renderIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.tile,{borderRightWidth:0}]}>
            {this.renderIcon(1,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.tile,{borderLeftWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.tile,{borderBottomWidth: 0}]}>
            {this.renderIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.tile,{borderRightWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderIcon(2,2)}
          </TouchableOpacity>
        </View>
        <View style={{paddingTop:50}}/>
        <Button title="Nuevo Juego" onPress={this.onNewGamePress}/>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth: 10,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  tileX: {
    color: "red",
    fontSize: 60,
    flex: 1,
  }, 
  tileO: {
    color: "green",
    fontSize: 60,
    flex: 1,
  }
});
