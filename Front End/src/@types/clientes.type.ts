

export interface clientstypes {
id: number
name: string,
email: string,
phone: string,
latitude: string,
longitude: string,
createdAt: string,
updatedAt: string,
deletedAt: string | null
}


export interface createClient {
		name: string,
		email: string,
		phone: string,
		latitude: string,
		longitude: string
}