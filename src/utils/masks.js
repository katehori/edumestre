// utils/masks.js

// Máscara de telefone: (11) 99999-9999
export const maskPhone = (value) => {
  if (!value) return '';
  
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11);
  
  // Aplica a máscara
  if (limited.length <= 10) {
    // (11) 9999-9999
    return limited.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    // (11) 99999-9999
    return limited.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
};

// Máscara de CPF: 000.000.000-00
export const maskCPF = (value) => {
  if (!value) return '';
  
  const numbers = value.replace(/\D/g, '');
  const limited = numbers.slice(0, 11);
  
  return limited.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Máscara de CNPJ: 00.000.000/0000-00
export const maskCNPJ = (value) => {
  if (!value) return '';
  
  const numbers = value.replace(/\D/g, '');
  const limited = numbers.slice(0, 14);
  
  return limited.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  );
};

// Detecta se é CPF ou CNPJ e aplica máscara apropriada
export const maskCPForCNPJ = (value) => {
  if (!value) return '';
  
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 11) {
    return maskCPF(value);
  } else {
    return maskCNPJ(value);
  }
};

// Máscara de CEP: 00000-000
export const maskCEP = (value) => {
  if (!value) return '';
  
  const numbers = value.replace(/\D/g, '');
  const limited = numbers.slice(0, 8);
  
  return limited.replace(/(\d{5})(\d{3})/, '$1-$2');
};

// Máscara de data: 00/00/0000
export const maskDate = (value) => {
  if (!value) return '';
  
  const numbers = value.replace(/\D/g, '');
  const limited = numbers.slice(0, 8);
  
  return limited.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
};

// Remove máscara e retorna apenas números
export const unmask = (value) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};