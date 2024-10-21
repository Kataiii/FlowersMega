export default class Transforms{
    public static transformAddress(
        area: string, 
        street: string, 
        house: string, 
        corpus?: string,
        entrance?: string,
        floor?: string,
        flat?: string
    ): string{
        return `${area}, ул. ${street}, д. ${house}, ${corpus ? `корпус ${corpus},` : ''} ${entrance ? `подъезд ${entrance},` : ''} ${floor ? `этаж ${floor},` : ''} ${flat ? `кв. ${flat}` : ''}`.replace(/\s+/g, ' ');
    }
}