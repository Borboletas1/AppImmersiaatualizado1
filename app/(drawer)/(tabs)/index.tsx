import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Platform,
  Animated,
  ImageBackground,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

const logoImage = require("../../../assets/images/logo.png");
// Imagens diferentes para cada banner
const banner1 = require("../../../assets/images/imagemsite.png");
const banner2 = require("../../../assets/images/banner2.webp"); // Mude para uma imagem diferente
const banner3 = require("../../../assets/images/banner3.webp"); // Mude para uma imagem diferente

const isSmallDevice = width < 375;
const isLargeDevice = width >= 768;

// 🔥 BANNERS COMPLETOS
const banners = [
  {
    id: "1",
    title: "Visite o Rio de Janeiro",
    subtitle: "Até 30% OFF",
    buttonText: "Reserve",
    image: banner1,
    color: "#FF6B6B",
  },
  {
    id: "2",
    title: "Pacotes Completos",
    subtitle: "Hospedagem + Voo",
    buttonText: "Ver ofertas",
    image: banner2,
    color: "#4A90E2",
  },
  {
    id: "3",
    title: "Viagens em Grupo",
    subtitle: "Descontos especiais",
    buttonText: "Saiba mais",
    image: banner3,
    color: "#50C878",
  },
];
const pacotes = [
  {
    id: "1",
    nome: "PACOTE SERTÕES DO BRASIL",
    preco: "3200,00",
    imagem: require("../../../assets/images/sertao.webp"),
  },
  {
    id: "2",
    nome: "FAZENDA CAFÉ ESPECIAL",
    preco: "1800,00",
    imagem: require("../../../assets/images/img2.webp"),
  },
  {
    id: "3",
    nome: "CHALÉ MONTANHA",
    preco: "2500,00",
    imagem: require("../../../assets/images/img3.jpg"),
  },
  {
    id: "4",
    nome: "PRAIA DO FORTE",
    preco: "3500,00",
    imagem: require("../../../assets/images/img4.jpg"),
  },
  {
    id: "5",
    nome: "SERRA GAÚCHA",
    preco: "2200,00",
    imagem: require("../../../assets/images/img5.jpg"),
  },
];

// 🔥 BANNER CAROUSEL - CORRIGIDO (AGORA VAI DO 1º → 2º → 3º → 1º)
const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);
  const isAutoPlaying = useRef(true);

  // 🔥 REF para guardar o índice atual (evita problema de closure)
  const currentIndexRef = useRef(0);

  const bannerHeight = width * 0.6;

  // 🔥 Atualiza a ref sempre que o currentIndex mudar
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (isAutoPlaying.current && flatListRef.current) {
        // 🔥 USA A REF para pegar o valor atualizado
        const currentIdx = currentIndexRef.current;
        let nextIndex = currentIdx + 1;
        if (nextIndex >= banners.length) {
          nextIndex = 0;
        }

        console.log("indo de", currentIdx, "para", nextIndex);

        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
          viewPosition: 0,
        });
        setCurrentIndex(nextIndex);
      }
    }, 4000);
  };

  const stopAutoPlay = () => {
    isAutoPlaying.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetAutoPlay = () => {
    stopAutoPlay();
    isAutoPlaying.current = true;
    startAutoPlay();
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  const onMomentumScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);

    if (newIndex !== currentIndexRef.current) {
      setCurrentIndex(newIndex);
    }
    resetAutoPlay();
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index || 0;
      if (newIndex !== currentIndexRef.current) {
        setCurrentIndex(newIndex);
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: false,
  }).current;

  const renderBanner = ({ item }) => (
    <View style={{ width: width, height: bannerHeight }}>
      <ImageBackground
        source={item.image}
        style={styles.bannerImage}
        resizeMode="cover"
      >
        <View style={styles.bannerOverlay}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>{item.title}</Text>
            <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
            <TouchableOpacity
              style={[styles.bannerButton, { backgroundColor: item.color }]}
            >
              <Text style={styles.bannerButtonText}>{item.buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  const renderDots = () => (
    <View style={[styles.dotsContainer, { bottom: bannerHeight * 0.08 }]}>
      {banners.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
              },
              currentIndex === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );

  return (
    <View style={[styles.carouselContainer, { height: bannerHeight }]}>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onTouchStart={stopAutoPlay}
        onTouchEnd={resetAutoPlay}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
        initialScrollIndex={0}
        snapToAlignment="start"
        snapToInterval={width}
        decelerationRate="fast"
        disableIntervalMomentum={true}
      />
      {renderDots()}
    </View>
  );
};
const PacoteCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const timerRef = useRef(null);

  const cardWidth = width * 0.8;
  const cardMargin = 10;
  const snapInterval = cardWidth + cardMargin;
  const offset = (width - cardWidth) / 2;

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex + 1 >= pacotes.length ? 0 : prevIndex + 1;

        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
            viewPosition: 0.1,
          });
        }

        return nextIndex;
      });
    }, 4000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / snapInterval);

    if (index !== activeIndex && index >= 0 && index < pacotes.length) {
      setActiveIndex(index);
    }
  };

  const handleScrollEnd = () => {
    stopTimer();
    startTimer();
  };

  const getItemLayout = (data, index) => ({
    length: snapInterval,
    offset: snapInterval * index,
    index,
  });

  const renderPacote = ({ item }) => (
    <View style={[styles.pacoteCard, { width: cardWidth }]}>
      <View style={styles.molduraImagem}>
        <Image source={item.imagem} style={styles.pacoteImagem} />
      </View>
      <Text style={styles.pacoteNome}>{item.nome}</Text>
      <View style={styles.precoContainer}>
        <Text style={styles.pacotePreco}>{item.preco}</Text>
        <Text style={styles.cifrao}>R$</Text>
      </View>
      <TouchableOpacity style={styles.botaoSaibaMais}>
        <Text style={styles.botaoTexto}>SAIBA MAIS</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDots = () => (
    <View style={styles.pacoteDotsContainer}>
      {pacotes.map((_, index) => (
        <View
          key={index}
          style={[
            styles.pacoteDot,
            activeIndex === index && styles.pacoteDotActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.pacoteCarouselContainer}>
      <FlatList
        ref={flatListRef}
        data={pacotes}
        renderItem={renderPacote}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: offset }}
        snapToAlignment="center"
        snapToInterval={snapInterval}
        decelerationRate="fast"
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        onTouchStart={stopTimer}
        onTouchEnd={handleScrollEnd}
        getItemLayout={getItemLayout}
        scrollEventThrottle={16}
      />
      {renderDots()}
    </View>
  );
};

// 🔥 CARD
function Card({ titulo, imagem, style, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        style,
        {
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
      onPress={onPress}
    >
      <ImageBackground
        source={imagem}
        style={styles.image}
        imageStyle={styles.imageBorder}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>{titulo}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

// 🔥 APP
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 2. Carrossel de Banners (Topo) */}
        <BannerCarousel />

        <View style={styles.contentContainer}>
          {/* 4. SEÇÃO "CONHEÇA O QUE OFERECEMOS" (LOGA ABAIXO) */}
          <View style={[styles.textContainer, { marginTop: 150 }]}>
            <Text style={styles.h3}>Conheça o que oferecemos:</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.cardsContainer}>
            <Card
              titulo="EXPERIÊNCIA"
              imagem={require("../../../assets/images/exp.jpg")}
            />
            <Card
              titulo="HOSPEDAGENS"
              imagem={require("../../../assets/images/hosp.webp")}
            />
            <Card
              titulo="PACOTES"
              imagem={require("../../../assets/images/pacotes.jpg")}
            />
          </View>

          {/* 5. Mapa / Localização (Final) */}
          <View style={[styles.textContainer, { marginTop: 40 }]}>
            <Text style={styles.h3}>Experiências próximas de você</Text>
            <View style={styles.underline} />
          </View>

          <Card
            imagem={require("../../../assets/images/brasil.jpg")}
            style={styles.mapa}
          />
          {/* 3. Seção de Promoções (O carrossel marrom) */}
          <View style={[styles.textContainer, { marginTop: 20 }]}>
            <Text style={styles.h3}>Promoções da semana</Text>
            <View style={styles.underline} />
          </View>
          {/* Espaço para não cortar o final no scroll */}
          <View style={{ height: 10 }} />
          <PacoteCarousel />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
// 🔥 ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEAE0",
  },

  header: {
    alignItems: "center",
    padding: 10,
    paddingTop: Platform.OS === "ios" ? 10 : 20,
    backgroundColor: "#584128",
  },

  logo: {
    width: 200,
    height: 60,
  },

  carouselContainer: {
    height: isSmallDevice ? 200 : isLargeDevice ? 300 : 250,
    position: "relative",
  },

  bannerCard: {
    width: width,
    height: "100%",
    overflow: "hidden",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  bannerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
    padding: 20,
  },
  bannerContent: {
    paddingHorizontal: 20,
  },

  bannerTitle: {
    fontSize: isSmallDevice ? 22 : 28,
    fontWeight: "bold",
    color: "#FFF",
  },

  bannerSubtitle: {
    fontSize: isSmallDevice ? 12 : 14,
    color: "#FFF",
    marginVertical: 8,
  },

  bannerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  bannerButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  dotsContainer: {
    position: "absolute",
    bottom: 150,
    flexDirection: "row",
    alignSelf: "center",
  },

  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFF",
    marginHorizontal: 4,
  },

  dotActive: {
    backgroundColor: "#FF6B6B",
  },

  cardsContainer: {
    alignItems: "center",
    marginTop: -130,
  },

  card: {
    width: "85%",
    height: 90,
    marginVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    transform: [{ scale: 1.2 }], // 🔥 aumenta a imagem
    width: "100%",
    height: "100%",
  },

  imageBorder: {
    borderRadius: 20,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  contentContainer: {
    marginTop: -100, // Ajuste esse valor para subir o bloco todo sobre o carrossel, se desejar
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 15, // Espaço entre o texto/linha e o que vem abaixo
  },

  h3: {
    fontSize: 20,
    color: "#584128",
    fontWeight: "bold",
    textTransform: "none", // Garante que não fique tudo em maiúsculo se não quiser
  },

  underline: {
    height: 2,
    backgroundColor: "#C5A87B", // Aquele tom dourado/bege da sua imagem
    width: 500, // Ajuste o tamanho da linha aqui
    marginTop: 4,
    borderRadius: 2,
  },

  cardsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10, // Espaço antes de começar o próximo bloco de texto
  },
  mapa: {
    width: "60%", // Mudei para 100% para ocupar a largura da tela
    height: 300, // <--- AQUI você define a nova altura
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 20, // Opcional: para arredondar as bordas do container
  },
  // 🔥 ESTILOS AJUSTADOS PARA MOBILE (TAMANHO REDUZIDO)
  pacoteCarouselContainer: {
    position: "relative",
    marginVertical: 5,
    width: width,
  },

  pacoteDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },

  pacoteDot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C5A87B",
    marginHorizontal: 3,
  },

  pacoteDotActive: {
    backgroundColor: "#584128",
    width: 16,
  },

  pacoteCard: {
    alignItems: "center",
    marginRight: 15,
    paddingVertical: 8,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },

  molduraImagem: {
    width: "95%",
    height: 140, // Reduzido de 200
    borderWidth: 3, // Reduzido de 4
    borderColor: "#584128",
    padding: 4, // Reduzido de 5
    backgroundColor: "#F5F5DC",
    borderRadius: 8,
  },

  pacoteImagem: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 6,
  },

  pacoteNome: {
    fontSize: 11, // Reduzido de 14
    color: "#C5A87B",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 8,
  },

  precoContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 3,
  },

  pacotePreco: {
    fontSize: 18, // Reduzido de 24
    color: "#584128",
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },

  cifrao: {
    fontSize: 12, // Reduzido de 16
    color: "#C5A87B",
    fontWeight: "bold",
    marginLeft: 4,
    marginBottom: 3,
  },

  botaoSaibaMais: {
    backgroundColor: "#4A3721",
    paddingHorizontal: 20, // Reduzido de 30
    paddingVertical: 6, // Reduzido de 10
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 10,
  },

  botaoTexto: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 11, // Reduzido de 14
  },
});
