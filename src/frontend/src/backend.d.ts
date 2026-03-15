import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Watch {
    id: bigint;
    movement: string;
    caseSize: bigint;
    name: string;
    description: string;
    waterResistance: string;
    brand: string;
    priceCents: bigint;
    material: string;
}
export interface CartItem {
    watchId: bigint;
    quantity: bigint;
}
export interface backendInterface {
    addToCart(watchId: bigint, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getAllWatches(): Promise<Array<Watch>>;
    getCart(): Promise<Array<CartItem>>;
    getCartTotalCents(): Promise<bigint>;
    getWatch(id: bigint): Promise<Watch>;
    removeFromCart(watchId: bigint): Promise<void>;
}
