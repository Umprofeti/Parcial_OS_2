import React from 'react'
import { Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';
const styles = StyleSheet.create({
      body:{
        paddingTop:35,
        paddingBottom:65,
        paddingHorizontal:35
      },
      title:{
        fontSize:21,
        fontWeight:"bold"
      },
      text:{
        fontSize:14,
        marginBottom:20
      },
      image:{
       marginVertical:15,
       marginHorizontal:100,
      },
      header:{
        fontSize:12,
        marginBottom:20,
        textAlign:"center",
        color:"grey",
      },
      pageNumber:{
        position:"absolute",
        fontSize:12,
        bottom:30,
        left:0,
        right:0,
        textAlign:"center",
        color:"grey"
      },
      divLinea: {
        width: '100%',
        borderBottom: '2px solid black',
        marginBottom: 10,
      },
      nombreContainer: {
        flexDirection: 'row',
        marginBottom: 28,
      },
      etiquetaNombre: {
        fontSize: 14,
        marginRight: 5,
      },
      valorNombre: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        flex: 1, // Añade esta línea
      },
      tituloContainerCompra:{
        marginTop:20,
        marginBottom:50,
        textAlign:"center"
      },
      imgAuto: {
        width: 200, 
        height: 120, 
      },
      etiquetaFinal: {
        position: 'absolute',
        bottom: 50, 
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
      },
})

export default function DocumentoPDF({nombre, fecha,correo,modelo,precio, precioImpuesto}) {

  return (
    <Document>
        <Page style={styles.body}>
            <View style={styles.divLinea}>
                <Text style={styles.title}>URBANRIDEZ</Text>
            </View>
            <Text style={styles.text} >RECIBO DE LA CUENTA</Text>
            <View style={styles.tituloContainerCompra}>
                <Text style={styles.etiquetaNombre}>INFORMACIÓN DE LA COMPRA</Text>
            </View>
            <View style={styles.nombreContainer}>
                <Text style={styles.etiquetaNombre}>Nombre:</Text>
                <Text style={styles.valorNombre}>{nombre}</Text>
            </View>
            <View style={styles.nombreContainer}>
                <Text style={styles.etiquetaNombre}>Fecha de la compra:</Text>
                <Text style={styles.valorNombre}>{fecha}</Text>
            </View>
            <View style={styles.nombreContainer}>
                <Text style={styles.etiquetaNombre}>Correo del comprador:</Text>
                <Text style={styles.valorNombre}>{correo}</Text>
            </View>
            <View style={styles.nombreContainer}>
                <Text style={styles.etiquetaNombre}>Modelo del auto:</Text>
                <Text style={styles.valorNombre}>{modelo}</Text>
            </View>
            <View style={styles.nombreContainer}>
                <Text style={styles.etiquetaNombre}>Año del modelo: </Text>
                <Text style={styles.valorNombre}>2023</Text>
            </View>
            <View style={styles.nombreContainer}>
                <Text style={styles.etiquetaNombre}>Precio: </Text>
                <Text style={styles.valorNombre}>{precio}</Text>
            </View>
            <View style={styles.nombreContainer}>
                <Text style={styles.etiquetaNombre}>Precio + impuesto: </Text>
                <Text style={styles.valorNombre}>{precioImpuesto}</Text>
            </View>
            
            <Text style={styles.etiquetaFinal}>Gracias por su compra </Text>

            <Text style={styles.pageNumber} render={({pageNumber,totalPages})=>`${pageNumber}/${totalPages}`} fixed></Text>
        </Page>
    </Document>
  )
}
