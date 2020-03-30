import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons' // Pacote de ícones
import { useNavigation } from '@react-navigation/native' // Para gerar Nevegação entre telas - semelhante ao useHistory na web
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

import logoImg from '../../assets/logo.png'

import styles from './styles'
import api from '../../services/api'

export default function Action() {
    const [ actions, setActions ] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(action){ // Add parâmetro action que contem as informações da Ação vvinda do DB
        navigation.navigate('Detail', { action }); // Função para navegar/ir para a rota/tela  Detail e adciono o segundo parâmetro que contém infos do bd
    }

    async function loadActions(){
      if(loading){
        return;
      }

      if (total > 0 && actions.length === total){
        return;
      }

      setLoading(true);

      const response = await api.get('actions', {
        params: { page } // adiciona o número da página que está senda
      });

      setActions([...actions, ...response.data]); // Pega a lista de ações existente e adiciona ao vetor, no carregamento de nova página, adiciona o restante sem substituir as já renderizadas na tela.
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);
    }
    useEffect(() => {
      loadActions();
    }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Image source={logoImg} />
          <Text style={styles.headerText}>
              Total de <Text style={styles.headerTextBold}> {total} ações </Text>.
          </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha uma das ações abaixo para apoiar e salve o dia.</Text>

      <FlatList // Para permitir scroll do conteúdo
        style={styles.actionList}
        data={actions} //Array de dados que montará a lista de items
        keyExtractor={ action => String(action.id)} // Atribui uma chave identificadora a cada item da lista
        showsVerticalScrollIndicator={false} // Oculta a barra de scroll vertical
        onEndReached={loadActions} // Quando o scrool chega o final, carrega a página automaticamente para renderizar os novos itens da página seguinte na tela
        onEndReachedThreshold={0.2} // Indica a partir de que ponto novos itens serão carregados. Neste caso, quando estiver a 20% do final da lista.
        // item -> Parâmetro de renderItem responsável por pegar os dados que vem do DB. Abaixo item:action renomeia o item para action, que contem os dados retonados do banco.
        renderItem={ ({item: action}) => ( 
            // JSX dos items que serão renderizados dentro do FlatList
            <View style={styles.action}>
                <Text style={styles.actionProperty}>ORG:</Text>
                <Text style={styles.actionValue}>{action.name}</Text>

                <Text style={styles.actionProperty}>Ação:</Text>
                <Text style={styles.actionValue}> {action.title} </Text>

                <Text style={styles.actionProperty}>Valor:</Text>
                <Text style={styles.actionValue}>  
                 {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format( action.value )} 
                </Text>

                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => navigateToDetail(action)} // Quando clicar/pressionar vai pra tela Detail. E como tem um párâmetro sendo passado, para q a função não execute
                    // assim que a tela seja exbida, coloco ela dentro de uma arrow function. (função não nomeada)
                >
                    <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                    <Feather name="arrow-right" size={16} color="#E02041" />
                </TouchableOpacity> 

                {/* <Text style={styles.actionProperty}>Descrição:</Text>
                <Text style={styles.actionValue}>Estamos arrecadando doações para comprar e distribuir Álcool
                em gel para famílias carentes em Petrolina.</Text> */}

        </View> // Fim view Action 
        )} // Função responsável por renderizar os itens na tela
      /> 

    </View>
    // Fim view container
  );
}
