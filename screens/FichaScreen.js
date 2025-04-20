import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const FichaScreen = ({ personagens, armas, locais }) => {
  const [selecionados, setSelecionados] = useState({});

  const alternarSelecao = (categoria, item, status) => {
    setSelecionados((prev) => {
      // Se o item já estiver marcado com o status selecionado, queremos desmarcar ele (colocar em null)
      const novoStatus = prev[categoria]?.[item] === status ? null : status;

      // Iniciar uma cópia das seleções anteriores
      const novasSelecoes = {
        ...prev,
        [categoria]: {
          ...prev[categoria],
          [item]: novoStatus,
        },
      };

      // Obtenha todos os itens da categoria
      const listaCategoria = categoria === "personagens" ? personagens : categoria === "armas" ? armas : locais;

      // Se o status é "certo", marque todos os outros como "errado"
      if (novoStatus === 'certo') {
        listaCategoria.forEach((outroItem) => {
          if (outroItem !== item) {
            novasSelecoes[categoria][outroItem] = 'errado';
          }
        });
      }

      // Se o status for null, não fazemos alterações nos outros itens
      return novasSelecoes;
    });
  };

  const limparSelecoes = () => {
    setSelecionados({});
  };

  const corDeFundo = (status) => {
    switch (status) {
      case 'certo': return '#c8f7c5';
      case 'errado': return '#f7c5c5';
      case 'duvida': return '#fdf7c3';
      default: return '#eee';
    }
  };

  const renderLista = (categoria, dados) => (
    <View>
      <Text style={styles.titulo}>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</Text>
      {dados.map((item) => {
        const status = selecionados[categoria]?.[item];
        return (
          <View key={item} style={[styles.itemContainer, { backgroundColor: corDeFundo(status) }]}>
            <Text style={styles.textoItem}>{item}</Text>
            <View style={styles.iconesContainer}>
              <TouchableOpacity onPress={() => alternarSelecao(categoria, item, 'certo')}>
                <FontAwesome name="check" size={24} color={status === 'certo' ? 'green' : 'gray'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alternarSelecao(categoria, item, 'errado')}>
                <FontAwesome name="times" size={24} color={status === 'errado' ? 'red' : 'gray'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alternarSelecao(categoria, item, 'duvida')}>
                <FontAwesome name="question" size={24} color={status === 'duvida' ? 'gold' : 'gray'} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderLista("personagens", personagens)}
      {renderLista("armas", armas)}
      {renderLista("locais", locais)}

      <TouchableOpacity style={styles.botaoLimpar} onPress={limparSelecoes}>
        <Text style={styles.textoBotao}>Limpar Tudo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
  },
  textoItem: {
    fontSize: 16,
  },
  iconesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  botaoLimpar: {
    marginTop: 24,
    backgroundColor: '#ff5555',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default FichaScreen;
