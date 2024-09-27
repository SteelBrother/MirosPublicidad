export const formatCurrency = amount => Number(amount).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP'
});
