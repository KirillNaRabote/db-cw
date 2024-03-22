export const convertPrice = (price: number) => {
    return price.toLocaleString('RU', {
        style: 'currency',
        currency: 'RUB',
    })
}