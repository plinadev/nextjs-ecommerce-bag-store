import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "John",
      email: "admin@example.com",
      password: hashSync("123456", 10),
      role: "admin",
    },
    {
      name: "Jane",
      email: "user@example.com",
      password: hashSync("123456", 10),
      role: "user",
    },
  ],
  products: [
    {
      name: "Wander matelassé nappa leather hobo bag",
      slug: "wander-matelasse-nappa-leather-hobo-bag",
      category: "Hobo Bags",
      description:
        "The Wander bag is reinterpreted season after season, becoming an iconic accessory of Miu Miu collections.",
      images: ["/sample-products/1.avif", "/sample-products/2.avif"],
      price: 1099.99,
      brand: "Miu Miu",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "/banner-1.avif",
    },
    {
      name: "IVY suede bag",
      slug: "ivy-suede-bag",
      category: "Hobo Bags",
      description:
        "The soft touch of suede gives depth to the colors and enriches the IVY bag with timeless style. The tonal leather lettering logo completes the design with an iconic note.",
      images: ["/sample-products/5.avif", "/sample-products/6.avif"],
      price: 2285.9,
      brand: "Miu Miu",
      rating: 4.2,
      numReviews: 8,
      stock: 10,
      isFeatured: true,
      banner: "/banner-2.jpeg",
    },
    {
      name: "Arcadie Matelassé velvet bag",
      slug: "arcadie-matelasse-velvet-bag",
      category: "Small Bags",
      description:
        "Precious matelassé workmanship enhances the classic lines of this velvet  Arcadie matelassé bag thanks to a three-dimensional, textured, and extremely sophisticated effect.",
      images: ["/sample-products/3.avif", "/sample-products/4.avif"],
      price: 999.99,
      brand: "Miu Miu",
      rating: 4.9,
      numReviews: 3,
      stock: 0,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Beau leather bag",
      slug: "beau-leather-bag",
      category: "Small Bags",
      description:
        "The Beau bag combines retro inspiration and a contemporary spirit. The distinctive top-handle silhouette and trick detail enhance its functionality and character. ",
      images: ["/sample-products/7.avif", "/sample-products/8.avif"],
      price: 2539.95,
      brand: "Miu Miu",
      rating: 3.6,
      numReviews: 5,
      stock: 10,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Pocket leather bag",
      slug: "pocket-leather-bag",
      category: "Small Bags",
      description:
        "The unmistakable multi-pocket design of the Pocket bag embodies the refined functionality of Miu Miu style. This softly padded leather version stands out for its new volumes and unique details. ",
      images: ["/sample-products/9.avif", "/sample-products/10.avif"],
      price: 1779.99,
      brand: "Miu Miu",
      rating: 4.7,
      numReviews: 18,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    {
      name: "Aventure nappa leather bag",
      slug: "aventure-nappa-leather-bag",
      category: "Nappa Bag",
      description:
        "Inspired by the iconic style of 2009, the Aventure bag reflects a sleek, casual charm. This version with larger proportions features refined touches like the snap-hook closure and the distinctive trick. ",
      images: ["/sample-products/11.webp"],
      price: 1399.99,
      brand: "Miu Miu",
      rating: 4.6,
      numReviews: 12,
      stock: 8,
      isFeatured: true,
      banner: null,
    },
  ],
};

export default sampleData;
