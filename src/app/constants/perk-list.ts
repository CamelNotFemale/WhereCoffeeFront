import { PerkType } from "../enum/perk-type";
import { PerkData } from "../model/perks/perk-data";

export class PerkList {
    public static PERK_LIST: PerkData[] = [
        {
          state: false,
          type: PerkType.FREE_WATER,
          plainIcon: "bi bi-droplet",
          filledIcon: "bi bi-droplet-fill",
          isIcon: true,
          title: "Бесплатная вода"
        },
        {
          state: false,
          type: PerkType.TOILET,
          plainIcon: "bi bi-badge-wc",
          filledIcon: "bi bi-badge-wc-fill",
          isIcon: true,
          title: "Туалет"
        },
        {
          state: false,
          type: PerkType.STREET_TERRACE,
          plainIcon: "bi bi-tree",
          filledIcon: "bi bi-tree-fill",
          isIcon: true,
          title: "Уличная терраса"
        },
        {
          state: false,
          type: PerkType.CHARGER,
          plainIcon: "bi bi-battery",
          filledIcon: "bi bi-battery-charging",
          isIcon: true,
          title: "Имеется зарядка"
        },
        {
          state: false,
          type: PerkType.VEGETARIAN,
          plainIcon: "/assets/images/icons8-vegan.png",
          filledIcon: "/assets/images/icons8-vegan-filled.png",
          isIcon: false,
          title: "Веганское меню"
        },
        {
          state: false,
          type: PerkType.TOPPINGS,
          plainIcon: "/assets/images/icons8-syrup.png",
          filledIcon: "/assets/images/icons8-syrup-filled.png",
          isIcon: false,
          title: "Топпинги"
        },  
        {
          state: false,
          type: PerkType.SOCKET,
          plainIcon: "bi bi-plug",
          filledIcon: "bi bi-plug-fill",
          isIcon: true,
          title: "Розетки"
        },
        {
          state: false,
          type: PerkType.GRAIN_COFFEE,
          plainIcon: "/assets/images/icons8-coffee-beans-24.png",
          filledIcon: "/assets/images/icons8-coffee-beans-24-filled.png",
          isIcon: false,
          title: "Зерновое кофе"
        },
        {
          state: false,
          type: PerkType.WIFI,
          plainIcon: "bi bi-router",
          filledIcon: "bi bi-router-fill",
          isIcon: true,
          title: "Wi-Fi"
        }
      ];
}
