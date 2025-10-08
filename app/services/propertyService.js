export const getProperties = async (params) => {
    return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties${params ? params : ""}`)
        .then(res => res.json());
}

export const getProperty = async (slug) => {
    return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${slug}`)
        .then(res => res.json());
}