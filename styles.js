import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from './constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.CONTAINER_MAIN,
    padding: 8,
    paddingTop: 25
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 25
  },
  inputStyle: {
    backgroundColor: colors.INPUT_BACKGROUND,
    fontSize: 16,
  },
  buttonsContainer: {
    borderColor: colors.BLACK,
    borderWidth: 1,
  },
  button: {
    width: 50,
    height: 50,
    borderColor: colors.BLACK,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BUTTON_BG,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  rowButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  rowButtonsContainer: {
    maxWidth: 350,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
  }
});