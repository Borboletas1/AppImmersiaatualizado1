import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";

const { width } = Dimensions.get("window");
const logoImage = require("../../assets/images/logo.png");

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [carregandoGoogle, setCarregandoGoogle] = useState(false);

  // Função para formatar CPF
  const formatarCPF = (texto: string) => {
    let cpfFormatado = texto.replace(/\D/g, "");
    if (cpfFormatado.length <= 11) {
      cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
      cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
      cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return cpfFormatado;
  };

  // Função para formatar Data de Nascimento
  const formatarData = (texto: string) => {
    let dataFormatada = texto.replace(/\D/g, "");
    if (dataFormatada.length <= 8) {
      dataFormatada = dataFormatada.replace(/(\d{2})(\d)/, "$1/$2");
      dataFormatada = dataFormatada.replace(/(\d{2})(\d)/, "$1/$2");
    }
    return dataFormatada;
  };

  // Função para validar CPF
  const validarCPF = (cpf: string) => {
    const cpfLimpo = cpf.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;
    
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador1 !== parseInt(cpfLimpo.charAt(9))) return false;
    
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador2 !== parseInt(cpfLimpo.charAt(10))) return false;
    
    return true;
  };

  // Função para validar idade (mínimo 18 anos)
  const validarIdade = (data: string) => {
    const partes = data.split("/");
    if (partes.length !== 3) return false;
    
    const dia = parseInt(partes[0]);
    const mes = parseInt(partes[1]) - 1;
    const ano = parseInt(partes[2]);
    
    const dataNasc = new Date(ano, mes, dia);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const diferencaMeses = hoje.getMonth() - dataNasc.getMonth();
    
    if (diferencaMeses < 0 || (diferencaMeses === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }
    
    return idade >= 18;
  };

  const handleCadastro = () => {
    if (!nome || !email || !cpf || !dataNascimento || !senha || !confirmarSenha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    if (!validarCPF(cpf)) {
      Alert.alert("Erro", "CPF inválido!");
      return;
    }

    if (!validarIdade(dataNascimento)) {
      Alert.alert("Erro", "Você deve ter pelo menos 18 anos para se cadastrar!");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    setCarregando(true);

    setTimeout(() => {
      setCarregando(false);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    }, 1500);
  };

  const handleGoogleSignup = () => {
    setCarregandoGoogle(true);

    setTimeout(() => {
      setCarregandoGoogle(false);
      Alert.alert(
        "Google Sign Up",
        "Cadastro com Google realizado com sucesso!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/index"),
          },
        ],
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo e Título */}
          <View style={styles.header}>
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>Cadastre-se para começar</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            {/* Campo Nome */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>

            {/* Campo Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Campo CPF */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>CPF</Text>
              <TextInput
                style={styles.input}
                placeholder="123.456.789-00"
                placeholderTextColor="#999"
                value={cpf}
                onChangeText={(texto) => setCpf(formatarCPF(texto))}
                keyboardType="numeric"
                maxLength={14}
              />
            </View>

            {/* Campo Data de Nascimento */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Data de nascimento</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#999"
                value={dataNascimento}
                onChangeText={(texto) => setDataNascimento(formatarData(texto))}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>

            {/* Campo Senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="••••••••"
                  placeholderTextColor="#999"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setMostrarSenha(!mostrarSenha)}
                >
                  <Text style={styles.eyeIcon}>
                    {mostrarSenha ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Campo Confirmar Senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="••••••••"
                  placeholderTextColor="#999"
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  secureTextEntry={!mostrarConfirmarSenha}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() =>
                    setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                  }
                >
                  <Text style={styles.eyeIcon}>
                    {mostrarConfirmarSenha ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Separador */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Botão Google */}
            <TouchableOpacity
              style={[
                styles.googleButton,
                carregandoGoogle && styles.buttonDisabled,
              ]}
              onPress={handleGoogleSignup}
              disabled={carregandoGoogle}
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.googleButtonText}>
                {carregandoGoogle ? "Entrando..." : "Continuar com Google"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botão Cadastrar */}
          <TouchableOpacity
            style={[styles.signupButton, carregando && styles.buttonDisabled]}
            onPress={handleCadastro}
            disabled={carregando}
          >
            <Text style={styles.signupButtonText}>
              {carregando ? "Cadastrando..." : "Cadastrar"}
            </Text>
          </TouchableOpacity>

          {/* Termos */}
          <Text style={styles.terms}>
            Ao cadastrar, você concorda com nossos{" "}
            <Text style={styles.termsLink}>Termos de Uso</Text> e{" "}
            <Text style={styles.termsLink}>Política de Privacidade</Text>
          </Text>

          {/* Link para Login */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem uma conta? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Fazer login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEAE0",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#584128",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
  },
  passwordContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    padding: 8,
  },
  eyeIcon: {
    fontSize: 20,
  },
  terms: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginVertical: 16,
    lineHeight: 20,
  },
  termsLink: {
    color: "#C5A87B",
    fontWeight: "600",
  },
  signupButton: {
    backgroundColor: "#584128",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#999",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  googleIcon: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#DB4437",
  },
  googleButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  footerText: {
    fontSize: 16,
    color: "#666",
  },
  footerLink: {
    fontSize: 16,
    color: "#C5A87B",
    fontWeight: "600",
  },
});