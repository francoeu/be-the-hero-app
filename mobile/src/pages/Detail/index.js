import React from 'react';
import { Text, View, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons' // Pacote de ícones
import { useNavigation, useRoute } from '@react-navigation/native' // useRoute serve para pegar informações específicas da página atual
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Detail() {
    const navigation = useNavigation()

    const route = useRoute();
    const action = route.params.action
    const message = `Olá ${action.name}, estou entrando em contato pois gostaria de ajudar na ação "${action.title}". `

    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói da ação: ${action.title}`,
            recipients: [action.email],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${action.whatsapp}&text=${message}`) // Método deep link: Possibilita uma aplicação abir outra aplicação e execurar uma ação.
    }
  return ( 
    <View style={styles.container}>
          <View style={styles.header}>
          <Image source={logoImg} />
         
          <TouchableOpacity onPress={navigateBack}>
              <Feather name="arrow-left" size={28} color="#e02041" /> 
          </TouchableOpacity>
      </View>


   <ScrollView 
    showsVerticalScrollIndicator={false} >
    <View style={styles.action}>
                    <Text style={[styles.actionProperty, {marginTop: 0}]}>ORG:</Text>
                    <Text style={styles.actionValue}> {action.name} de {action.city}/{action.uf} </Text>

                    <Text style={styles.actionProperty}>Ação:</Text>
                    <Text style={styles.actionValue}> {action.title} </Text>

                    <Text style={styles.actionProperty}>Valor:</Text>
                    <Text style={styles.actionValue}>  
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format( action.value )} 
                    </Text>

                    <Text style={styles.actionProperty}>Descrição:</Text>
                    <Text style={styles.actionValue}>{action.description}</Text>

            </View> 

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroí dessa ação.</Text>

                <Text style={styles.heroDescription}>Entre em contato para ajudar:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>WhatsApp</Text>
                            {/* <Feather name="arrow-right" size={16} color="#E02041" /> */}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={sendMail}>
                            <Text style={styles.actionText}>E-mail </Text>
                            {/* <Feather name="arrow-right" size={16} color="#E02041" /> */}
                    </TouchableOpacity>
                </View>
            </View>
   </ScrollView>


    </View> // fim container
  );
}
