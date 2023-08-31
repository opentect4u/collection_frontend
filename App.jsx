import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainNavigation from './src/Navigation/MainNavigation'
import AppContext from './src/Context/AppContext'

const App = () => {
  return (
    <>
      <AppContext>
        <MainNavigation />

      </AppContext>


    </>
  )
}

export default App

const styles = StyleSheet.create({})