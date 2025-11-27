export const useMenu = () => {
  const menu = [
    {
      name: "Nasi Goreng Spesial",
      slug: "nasi-goreng-spesial",
      price: 25000,
      image: "/img/nasigoreng.jpg",
      description: "Nasi goreng dengan topping lengkap dan bumbu spesial.",
    },
    {
      name: "Ayam Bakar",
      slug: "ayam-bakar",
      price: 30000,
      image: "/img/ayambakar.jpg",
      description: "Ayam bakar bumbu madu dengan sambal bawang segar.",
    },
  ]

  const getFood = (slug: string) =>
    menu.find((m) => m.slug === slug)

  return { menu, getFood }
}