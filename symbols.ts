import type { InjectionKey } from "vue";
import type { Modal } from "./types";

export const ModalKey: InjectionKey<Modal> = Symbol("Modal");
