import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput } from 'react-native';

import {printToFileAsync} from 'expo-print';
import { shareAsync } from 'expo-sharing';

import Button from '../Button';

export default function PDF({transactions, appTotal, appVAT, appNet, month, day, modalVisible, setModalVisible, numCoffees, numDrinks, numSoup, numKitKat, numOfTaxable}){  

    const [cardTotal, setCardTotal] = useState(0);
    const [tillVAT, setTillVAT] = useState(0);
    const [tillTotal, setTillTotal] = useState(0);

    generatePDF = async () => {

      console.log(numOfTaxable)
      console.log(numCoffees)
      console.log(numDrinks)
      console.log(numSoup)
      console.log(numKitKat)

        const html = `
        <html>
        <head>
          <style>
            body {
              font-family: 'Helvetica';
              font-size: 12px;
            }
      
            header,
            footer {
              height: 50px;
              background-color: #fff;
              color: #000;
              display: flex;
              justify-content: center;
              padding: 0 20px;
            }
      
            footer {
              margin-top: 50px;
            }
      
            table {
              width: 100%;
              border-collapse: collapse;
            }
      
            th,
            td {
              border: 1px solid #000;
              padding: 5px;
            }
      
            th {
              background-color: #ccc;
            }
      
            h3 {
              margin: 1px;
            }
      
            .piechart {
              width: 400px;
              height: 400px;
              border-radius: 50%;
              background-image: conic-gradient(pink 70deg,
                  lightblue 0 235deg,
                  orange 0);
            }
      
            .pieContainer {
              display: flex;
              margin: px;
              justify-content: center;
              align-items: center;
            }
          </style>
        </head>
        <body>
          <header>
            <h1>Sales Report</h1>
          </header>
          <h3>Rudi</h3>
          <h3>30 Forrest Rd</h3>
          <h3>Edinburgh</h3>
          <h3>EH1 2QN</h3>
          <h1>${day}/${month}/2023 Statment</h1>
          <h2>Today's Overview</h2>
          <table>
            <tr>
              <th>App</th>
              <th>Till</th>
            </tr>
            <tr>
              <td>Total: £${appTotal.toFixed(2)}</td>
              <td>Card Machine Total: £${cardTotal}</td>
            </tr>
            <tr>
              <td>VAT: £${appVAT.toFixed(2)}</td>
              <td>VAT Deducted: £${tillVAT}</td>
            </tr>
            <tr>
              <td>Net Total: £${appNet.toFixed(2)}</td>
              <td>Till Total: £${tillTotal}</td>
            </tr>
            <tr>
              <td></td>
              <td>Cash Sales: £${(tillTotal - cardTotal).toFixed(2)}</td>
            </tr>
          </table>
          <h2>Todays Transactions</h2>
          <table>
            <tr>
              <th>Transaction ID</th>
              <th>Sale Time</th>
              <th>Sale Total</th>
              <th>Sale Items</th>
            </tr> ${transactions.map( sale => ` <tr>
              <td>${sale._id}</td>
              <td>${sale.time}</td>
              <td>£${sale.total}</td>
              <td>${sale.items.map(item => item.name)}</td>
            </tr> `).join('')}
          </table>
          <h2>VAT Break Down (placeholder - not actual data!)</h2>
          <div class="pieContainer">
            <div class="piechart"></div>
          </div>
          <footer>
            <p>end of report</p>
          </footer>
        </body>
      </html>
    `;
        
        setModalVisible(!modalVisible)

        const file = await printToFileAsync({
            html: html,
            base64: false
        });

        await shareAsync(file.uri)
    }

    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Card Total</Text>
            <TextInput
            style={styles.input}
              onChangeText={setCardTotal}
              value={cardTotal}
              placeholder="Enter card machine total"
              keyboardType="numeric"
            />
            <Text style={styles.modalText}>VAT Deducted</Text>
            <TextInput
            style={styles.input}
              onChangeText={setTillVAT}
              value={tillVAT}
              placeholder="Enter VAT amount deducted"
              keyboardType="numeric"
            />
            <Text style={styles.modalText}>Total On Till</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTillTotal}
              value={tillTotal}
              placeholder="Enter total displayed on till"
              keyboardType="numeric"
            />
            <Button   
              style={styles.button}
              text={"Generate Report" }
              textStyle={styles.text}
              handleOnPress={generatePDF}
            />
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#128026',
        padding: 5,
        margin: 5,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5,
      },
      text: {
        fontSize: 20,
        fontWeight: "300",
        padding: 4,
        alignSelf: 'center',
        color: 'white'
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },  
  input: {
    alignItems: 'center',
    color: 'black',
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    padding: 5,
    margin: 5
  },
  modalText: {
    fontSize: 18,
    fontWeight: 400,
    margin: 5
  }
});