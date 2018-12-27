//region Import types
import { Equipment, PartOfCar } from 'commonTypes';
//endregion

//region defaultEquipment
const defaultEquipment: Array<Equipment> = [
  {
    id: 0,
    name: 'aerial',
    count: 2,
    title: 'Антенна',
    values: 0,
  },
  {
    id: 1,
    name: 'medkit',
    count: 1,
    title: 'Аптечка',
    values: 0,
  },
  {
    id: 2,
    name: 'spareWheels',
    count: 1,
    title: 'Запасные колеса',
    values: 0,
  },
  {
    id: 3,
    name: 'sealant',
    count: 1,
    title: 'Герметик',
    values: 0,
  },
  {
    id: 4,
    name: 'mats',
    count: 6,
    title: 'Коврики',
    values: 0,
  },
  {
    id: 5,
    name: 'cigaretteLighter',
    count: 2,
    title: 'Прикуриватель',
    values: 0,
  },
  {
    id: 6,
    name: 'antiradar',
    count: 1,
    title: 'Антирадар',
    values: 0,
  },
  {
    id: 7,
    name: 'navigator',
    count: 1,
    title: 'Навигатор',
    values: 0,
  },
  {
    id: 8,
    name: 'phone',
    count: 1,
    title: 'Телефон',
    values: 0,
  },
  {
    id: 9,
    name: 'brushes',
    count: 3,
    title: 'Щетки стеклоочистителя',
    values: 0,
  },
  {
    id: 10,
    name: 'extinguisher',
    count: 1,
    title: 'Огнетушитель',
    values: 0,
  },
  {
    id: 11,
    name: 'jack',
    count: 1,
    title: 'Домкрат',
    values: 0,
  },
  {
    id: 12,
    name: 'tool',
    count: 1,
    title: 'Инструмент',
    values: 0,
  },
  {
    id: 13,
    name: 'headrests',
    count: 5,
    title: 'Подголовники',
    values: 0,
  },
  {
    id: 14,
    name: 'emergencySign',
    count: 1,
    title: 'Аварийный знак',
    values: 0,
  },
  {
    id: 15,
    name: 'rearMirror',
    count: 1,
    title: 'Зеркало заднее',
    values: 0,
  },
  {
    id: 16,
    name: 'sideMirrors',
    count: 2,
    title: 'Боковые зеркала',
    values: 0,
  },
  {
    id: 17,
    name: 'mudFlaps',
    count: 4,
    title: 'Брызговики',
    values: 0,
  },
  {
    id: 18,
    name: 'signalization',
    count: 1,
    title: 'Доп. сигнализация',
    values: 0,
  },
  {
    id: 19,
    name: 'bolts',
    count: 1,
    title: 'Секретные болты',
    values: 0,
  },
];
//endregion

//region getTemplatePart
const getTemplatePart = (name: string, title: string): PartOfCar => ({
  name,
  title,
  comment: '',
  level: 0,
  typesDamage: {
    scratch: false,
    dent: false,
    chip: false,
  },
});
//endregion

//region defaultDamage
const defaultDamage: Array<PartOfCar> = [
  getTemplatePart('roof', 'Крыша'),
  getTemplatePart('front_right_side', 'Правое переднее крыло'),
  getTemplatePart('front_left_side', 'Левое переднее крыло'),
  getTemplatePart('front_center', 'Капот'),
  getTemplatePart('front_window', 'Переднее окно'),
  getTemplatePart('front_right_door', 'Правая передняя дверь'),
  getTemplatePart('back_right_door', 'Правая задняя дверь'),
  getTemplatePart('front_left_door', 'Левая передняя дверь'),
  getTemplatePart('back_left_door', 'Левая задняя дверь'),
  getTemplatePart('back_window', 'Заднее окно'),
  getTemplatePart('back_right_side', 'Правое заднее крыло'),
  getTemplatePart('back_left_side', 'Левое заднее крыло'),
  getTemplatePart('back_center', 'Багажник'),
];
//endregion

//region defaultData
const defaultData: { defaultEquipment: Array<Equipment>; defaultDamage: Array<PartOfCar> } = {
  defaultEquipment,
  defaultDamage,
};
//endregion

//region Export
export default defaultData;
//endregion
