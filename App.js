import React from 'react';
import {
  Text,
  View,
  TextInput,
  Switch
} from 'react-native';

import { useState } from 'react';

import styles from './styles'
import { CalcBtn } from './button.component';
import { buttonsNumber, buttonsHex } from './buttons';
import { colors } from './constants';

export default function App() {
  const [result, setResult] = useState(0);
  const [allOperations, setAllOperations] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [hex, setHex] = useState(true);

  let switchHandler = (val) => {
    setHex(val);
    setCurrentNumber(0);
  }

  let addToCurrentNumber = (val) => {
    const currentNumbers = currentNumber ? currentNumber : '';
    if (!hex) {
      setCurrentNumber(Number(`${currentNumbers}${val}`));
    } else {
      setCurrentNumber(`${currentNumbers}${val}`);
    }
  }

  let addToallOperations = (operation) => {
    setAllOperations([...allOperations, {
      typeOperation: operation,
      type: hex ? 16 : 10,
      val: currentNumber
    }]);
    setCurrentNumber(0);
  }

  let add = () => {
    addToallOperations('+');
  }

  let subtract = () => {
    addToallOperations('-');
  }

  let multiplication = () => {
    addToallOperations('*');
  }

  let divide = () => {
    addToallOperations('/');
  }

  let clear = () => {
    setAllOperations([]);
    setCurrentNumber(0);
    setResult(0);
  }

  let getResult = () => {
    let operations = [...allOperations, {
      typeOperation: '',
      type: hex ? 16 : 10,
      val: currentNumber
    }];
    let result;

    let tempOperations = [...operations];

    const operationsActions = (typeOperation, operationFunction) => {
      for (let i = 0; i < tempOperations.length; i++) {
        if (tempOperations[i].typeOperation === typeOperation) {
          let val1;
          let val2;
          if (tempOperations[i].type === 10) {
            val1 = tempOperations[i].val;
            val2 = tempOperations[i + 1].val;
          } else if (tempOperations[i].type === 16) {
            val1 = parseInt(tempOperations[i].val, 16);
            val2 = parseInt(tempOperations[i + 1].val, 16);
          }
          let newOperation = {
            typeOperation: tempOperations[i + 1].typeOperation,
            val: operationFunction(val1, val2),
            type: tempOperations[i].type
          }
          tempOperations = [...tempOperations.slice(0, i), newOperation, ...tempOperations.slice(i + 2)];
          return true;
        }
      }
      return false;
    }

    while (tempOperations.length > 1) {
      if (operationsActions('*', (num1, num2) => num1 * num2)) {
        continue;
      }
      if (operationsActions('/', (num1, num2) => num1 / num2)) {
        continue;
      }
      if (operationsActions('+', (num1, num2) => num1 + num2)) {
        continue;
      }
      if (operationsActions('-', (num1, num2) => num1 - num2)) {
        continue;
      }
    }

    if (tempOperations[0].type === 10) {
      result = tempOperations[0].val;
    } else if (tempOperations[0].type === 16) {
      result = tempOperations[0].val.toString(16);
    }
    setResult(result);
    setAllOperations([]);
    setCurrentNumber(0);
  }

  const resString = result.toString();
  const resCurrentNumber = currentNumber.toString();

  const _allOperations = []
  allOperations.map(item => {
    if (item.type === 10) {
      _allOperations.push(item.val, item.typeOperation);
    } else if (item.type === 16) {
      _allOperations.push(`0x${item.val}`, item.typeOperation);
    }
  });

  const resAllOperations = _allOperations.join('');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textStyle}>Result:</Text>
        <TextInput
          style={styles.inputStyle}
          value={resString}
        />
        <Text style={styles.textStyle}>All operations:</Text>
        <TextInput
          style={styles.inputStyle}
          value={resAllOperations}
        />
        <Text style={styles.textStyle}>Current number:</Text>
        <TextInput
          style={styles.inputStyle}
          value={hex
            ? `0x${resCurrentNumber}`
            : resCurrentNumber
          }
        />
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.rowButtonContainer}>
          <CalcBtn
            onPress={clear}
            title={'AC'}
            styleContainer={{
              ...styles.button,
              backgroundColor: colors.BLUE
            }}
          />
          <Switch
            value={hex}
            onValueChange={(val) => switchHandler(val)}
          />
          <CalcBtn
            onPress={add}
            title={'+'}
            styleContainer={{
              ...styles.button,
              backgroundColor: colors.YELLOW
            }}
          />
          <CalcBtn
            onPress={subtract}
            title={'-'}
            styleContainer={{
              ...styles.button,
              backgroundColor: colors.YELLOW
            }}
          />
        </View>
        <View style={styles.rowButtonContainer}>
          <CalcBtn
            onPress={multiplication}
            title={'*'}
            styleContainer={{
              ...styles.button,
              backgroundColor: colors.YELLOW
            }}
          />
          <CalcBtn
            onPress={divide}
            title={'/'}
            styleContainer={{
              ...styles.button,
              backgroundColor: colors.YELLOW
            }}
          />
          <CalcBtn
            onPress={getResult}
            title={'='}
            styleContainer={{
              ...styles.button,
              backgroundColor: colors.YELLOW
            }}
          />
        </View>
        <View style={styles.rowButtonsContainer}>
          {
            buttonsNumber.map(item => {
              return (
                <CalcBtn
                  key={item.title}
                  title={item.title}
                  onPress={() => addToCurrentNumber(item.title)}
                  styleContainer={styles.button}
                />)
            })
          }
          {
            buttonsHex.map(item => {
              return (
                <CalcBtn
                  key={item.title}
                  title={item.title}
                  onPress={() => addToCurrentNumber(item.title)}
                  disabled={!hex}
                  styleContainer={styles.button}
                />
              )
            })
          }
        </View>
      </View>
    </View>
  );
}

