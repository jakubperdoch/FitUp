type Theme = {
  accentBackground: string;
  accentColor: string;
  background0: string;
  background025: string;
  background05: string;
  background075: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
  color0: string;
  color025: string;
  color05: string;
  color075: string;
  background: string;
  backgroundHover: string;
  backgroundPress: string;
  backgroundFocus: string;
  borderColor: string;
  borderColorHover: string;
  borderColorPress: string;
  borderColorFocus: string;
  color: string;
  colorHover: string;
  colorPress: string;
  colorFocus: string;
  colorTransparent: string;
  placeholderColor: string;
  outlineColor: string;

}

function t(a: [number, number][]) {
  let res: Record<string,string> = {}
  for (const [ki, vi] of a) {
    res[ks[ki] as string] = vs[vi] as string
  }
  return res as Theme
}
const vs = [
  'hsla(63, 97%, 64%, 1)',
  'hsla(0, 20%, 99%, 0)',
  'hsla(0, 20%, 99%, 0.25)',
  'hsla(0, 20%, 99%, 0.5)',
  'hsla(0, 20%, 99%, 0.75)',
  'hsla(0, 15%, 99%, 1)',
  'hsla(6, 32%, 88%, 1)',
  'hsla(12, 49%, 78%, 1)',
  'hsla(19, 66%, 68%, 1)',
  'hsla(25, 83%, 58%, 1)',
  'hsla(31, 100%, 48%, 1)',
  'hsla(31, 100%, 49%, 1)',
  'hsla(31, 100%, 50%, 1)',
  'hsla(0, 15%, 15%, 1)',
  'hsla(0, 15%, 10%, 1)',
  'hsla(0, 14%, 10%, 0)',
  'hsla(0, 14%, 10%, 0.25)',
  'hsla(0, 14%, 10%, 0.5)',
  'hsla(0, 14%, 10%, 0.75)',
  'hsla(201, 100%, 53%, 1)',
  'hsla(0, 26%, 18%, 1)',
  'hsla(0, 36%, 26%, 1)',
  'hsla(0, 47%, 34%, 1)',
  'hsla(0, 58%, 42%, 1)',
  'hsla(0, 69%, 50%, 1)',
  'hsla(8, 76%, 50%, 1)',
  'hsla(15, 84%, 50%, 1)',
  'hsla(23, 92%, 50%, 1)',
  'hsla(0, 15%, 93%, 1)',
  'hsla(0, 15%, 95%, 1)',
  'hsla(0, 15%, 95%, 0)',
  'hsla(0, 15%, 95%, 0.25)',
  'hsla(0, 15%, 95%, 0.5)',
  'hsla(0, 15%, 95%, 0.75)',
  'hsla(250, 50%, 40%, 0)',
  'hsla(250, 50%, 40%, 0.25)',
  'hsla(250, 50%, 40%, 0.5)',
  'hsla(250, 50%, 40%, 0.75)',
  'hsla(250, 50%, 40%, 1)',
  'hsla(145, 73%, 52%, 1)',
  'hsla(40, 97%, 64%, 1)',
  'hsla(86, 98%, 64%, 1)',
  'hsla(109, 98%, 64%, 1)',
  'hsla(132, 99%, 64%, 1)',
  'hsla(155, 99%, 65%, 1)',
  'hsla(178, 100%, 65%, 1)',
  'hsla(201, 100%, 65%, 1)',
  'hsla(250, 50%, 95%, 1)',
  'hsla(249, 52%, 95%, 0)',
  'hsla(249, 52%, 95%, 0.25)',
  'hsla(249, 52%, 95%, 0.5)',
  'hsla(249, 52%, 95%, 0.75)',
  'hsla(250, 50%, 35%, 0)',
  'hsla(250, 50%, 35%, 0.25)',
  'hsla(250, 50%, 35%, 0.5)',
  'hsla(250, 50%, 35%, 0.75)',
  'hsla(250, 50%, 35%, 1)',
  'hsla(225, 75%, 25%, 1)',
  'hsla(201, 100%, 14%, 1)',
  'hsla(201, 100%, 21%, 1)',
  'hsla(201, 100%, 27%, 1)',
  'hsla(201, 100%, 34%, 1)',
  'hsla(201, 100%, 40%, 1)',
  'hsla(201, 100%, 47%, 1)',
  'hsla(201, 100%, 60%, 1)',
  'hsla(250, 50%, 90%, 1)',
  'rgba(0,0,0,0.5)',
  'rgba(0,0,0,0.8)',
]

const ks = [
'accentBackground',
'accentColor',
'background0',
'background025',
'background05',
'background075',
'color1',
'color2',
'color3',
'color4',
'color5',
'color6',
'color7',
'color8',
'color9',
'color10',
'color11',
'color12',
'color0',
'color025',
'color05',
'color075',
'background',
'backgroundHover',
'backgroundPress',
'backgroundFocus',
'borderColor',
'borderColorHover',
'borderColorPress',
'borderColorFocus',
'color',
'colorHover',
'colorPress',
'colorFocus',
'colorTransparent',
'placeholderColor',
'outlineColor']


const n1 = t([[0, 0],[1, 0],[2, 1],[3, 2],[4, 3],[5, 4],[6, 5],[7, 6],[8, 7],[9, 8],[10, 9],[11, 10],[12, 11],[13, 11],[14, 12],[15, 12],[16, 13],[17, 14],[18, 15],[19, 16],[20, 17],[21, 18],[22, 5],[23, 4],[24, 6],[25, 6],[26, 8],[27, 7],[28, 9],[29, 8],[30, 14],[31, 13],[32, 14],[33, 13],[34, 15],[35, 12],[36, 16]])

export const light = n1
const n2 = t([[0, 19],[1, 19],[2, 15],[3, 16],[4, 17],[5, 18],[6, 14],[7, 20],[8, 21],[9, 22],[10, 23],[11, 24],[12, 25],[13, 26],[14, 27],[15, 12],[16, 28],[17, 29],[18, 30],[19, 31],[20, 32],[21, 33],[22, 14],[23, 20],[24, 18],[25, 18],[26, 22],[27, 23],[28, 21],[29, 22],[30, 29],[31, 28],[32, 29],[33, 28],[34, 30],[35, 27],[36, 31]])

export const dark = n2
const n3 = t([[0, 8],[1, 8],[2, 34],[3, 35],[4, 36],[5, 37],[6, 38],[7, 39],[8, 40],[9, 0],[10, 41],[11, 42],[12, 43],[13, 44],[14, 45],[15, 46],[16, 47],[17, 47],[18, 48],[19, 49],[20, 50],[21, 51],[22, 38],[23, 37],[24, 39],[25, 39],[26, 0],[27, 40],[28, 41],[29, 0],[30, 47],[31, 47],[32, 47],[33, 47],[34, 48],[35, 45],[36, 49]])

export const light_accent = n3
const n4 = t([[0, 27],[1, 27],[2, 52],[3, 53],[4, 54],[5, 55],[6, 56],[7, 57],[8, 58],[9, 59],[10, 60],[11, 61],[12, 62],[13, 63],[14, 19],[15, 64],[16, 65],[17, 47],[18, 48],[19, 49],[20, 50],[21, 51],[22, 56],[23, 57],[24, 55],[25, 55],[26, 59],[27, 60],[28, 58],[29, 59],[30, 47],[31, 65],[32, 47],[33, 65],[34, 48],[35, 19],[36, 49]])

export const dark_accent = n4
const n5 = t([[30, 13],[31, 12],[32, 13],[33, 12]])

export const light_alt1 = n5
const n6 = t([[30, 12],[31, 12],[32, 12],[33, 12]])

export const light_alt2 = n6
const n7 = t([[22, 8],[23, 7],[24, 9],[25, 9],[26, 11],[27, 10],[29, 11],[28, 11]])

export const light_active = n7
export const light_surface3 = n7
export const light_Button = n7
export const light_SliderTrackActive = n7
const n8 = t([[22, 6],[23, 5],[24, 7],[25, 7],[26, 9],[27, 8],[29, 9],[28, 10]])

export const light_surface1 = n8
export const light_ListItem = n8
export const light_SelectTrigger = n8
export const light_Card = n8
export const light_Progress = n8
export const light_TooltipArrow = n8
export const light_SliderTrack = n8
export const light_Input = n8
export const light_TextArea = n8
const n9 = t([[22, 7],[23, 6],[24, 8],[25, 8],[26, 10],[27, 9],[29, 10],[28, 11]])

export const light_surface2 = n9
export const light_Checkbox = n9
export const light_Switch = n9
export const light_TooltipContent = n9
export const light_RadioGroupItem = n9
const n10 = t([[22, 10],[23, 10],[24, 11],[25, 11],[26, 10],[27, 10],[29, 11],[28, 11]])

export const light_surface4 = n10
const n11 = t([[30, 28],[31, 12],[32, 28],[33, 12]])

export const dark_alt1 = n11
const n12 = t([[30, 12],[31, 27],[32, 12],[33, 27]])

export const dark_alt2 = n12
const n13 = t([[22, 22],[23, 23],[24, 21],[25, 21],[26, 25],[27, 26],[29, 25],[28, 24]])

export const dark_active = n13
export const dark_surface3 = n13
export const dark_Button = n13
export const dark_SliderTrackActive = n13
const n14 = t([[22, 20],[23, 21],[24, 14],[25, 14],[26, 23],[27, 24],[29, 23],[28, 22]])

export const dark_surface1 = n14
export const dark_ListItem = n14
export const dark_SelectTrigger = n14
export const dark_Card = n14
export const dark_Progress = n14
export const dark_TooltipArrow = n14
export const dark_SliderTrack = n14
export const dark_Input = n14
export const dark_TextArea = n14
const n15 = t([[22, 21],[23, 22],[24, 20],[25, 20],[26, 24],[27, 25],[29, 24],[28, 23]])

export const dark_surface2 = n15
export const dark_Checkbox = n15
export const dark_Switch = n15
export const dark_TooltipContent = n15
export const dark_RadioGroupItem = n15
const n16 = t([[22, 24],[23, 24],[24, 23],[25, 23],[26, 24],[27, 24],[29, 23],[28, 23]])

export const dark_surface4 = n16
const n17 = t([[30, 47],[31, 46],[32, 47],[33, 46]])

export const light_accent_alt1 = n17
const n18 = t([[30, 46],[31, 45],[32, 46],[33, 45]])

export const light_accent_alt2 = n18
const n19 = t([[22, 0],[23, 40],[24, 41],[25, 41],[26, 43],[27, 42],[29, 43],[28, 44]])

export const light_accent_active = n19
export const light_accent_surface3 = n19
export const light_accent_Button = n19
export const light_accent_SliderTrackActive = n19
const n20 = t([[22, 39],[23, 38],[24, 40],[25, 40],[26, 41],[27, 0],[29, 41],[28, 42]])

export const light_accent_surface1 = n20
export const light_accent_ListItem = n20
export const light_accent_SelectTrigger = n20
export const light_accent_Card = n20
export const light_accent_Progress = n20
export const light_accent_TooltipArrow = n20
export const light_accent_SliderTrack = n20
export const light_accent_Input = n20
export const light_accent_TextArea = n20
const n21 = t([[22, 40],[23, 39],[24, 0],[25, 0],[26, 42],[27, 41],[29, 42],[28, 43]])

export const light_accent_surface2 = n21
export const light_accent_Checkbox = n21
export const light_accent_Switch = n21
export const light_accent_TooltipContent = n21
export const light_accent_RadioGroupItem = n21
const n22 = t([[22, 42],[23, 42],[24, 43],[25, 43],[26, 42],[27, 42],[29, 43],[28, 43]])

export const light_accent_surface4 = n22
const n23 = t([[30, 65],[31, 64],[32, 65],[33, 64]])

export const dark_accent_alt1 = n23
const n24 = t([[30, 64],[31, 19],[32, 64],[33, 19]])

export const dark_accent_alt2 = n24
const n25 = t([[22, 59],[23, 60],[24, 58],[25, 58],[26, 62],[27, 63],[29, 62],[28, 61]])

export const dark_accent_active = n25
export const dark_accent_surface3 = n25
export const dark_accent_Button = n25
export const dark_accent_SliderTrackActive = n25
const n26 = t([[22, 57],[23, 58],[24, 56],[25, 56],[26, 60],[27, 61],[29, 60],[28, 59]])

export const dark_accent_surface1 = n26
export const dark_accent_ListItem = n26
export const dark_accent_SelectTrigger = n26
export const dark_accent_Card = n26
export const dark_accent_Progress = n26
export const dark_accent_TooltipArrow = n26
export const dark_accent_SliderTrack = n26
export const dark_accent_Input = n26
export const dark_accent_TextArea = n26
const n27 = t([[22, 58],[23, 59],[24, 57],[25, 57],[26, 61],[27, 62],[29, 61],[28, 60]])

export const dark_accent_surface2 = n27
export const dark_accent_Checkbox = n27
export const dark_accent_Switch = n27
export const dark_accent_TooltipContent = n27
export const dark_accent_RadioGroupItem = n27
const n28 = t([[22, 61],[23, 61],[24, 60],[25, 60],[26, 61],[27, 61],[29, 60],[28, 60]])

export const dark_accent_surface4 = n28
const n29 = t([[30, 6],[31, 5],[32, 7],[33, 7],[22, 14],[23, 13],[24, 14],[25, 13],[26, 12],[27, 12],[29, 11],[28, 11]])

export const light_SwitchThumb = n29
export const light_SliderThumb = n29
export const light_Tooltip = n29
export const light_ProgressIndicator = n29
const n30 = t([[22, 66]])

export const light_SheetOverlay = n30
export const light_DialogOverlay = n30
export const light_ModalOverlay = n30
export const light_accent_SheetOverlay = n30
export const light_accent_DialogOverlay = n30
export const light_accent_ModalOverlay = n30
const n31 = t([[30, 20],[31, 21],[32, 14],[33, 14],[22, 29],[23, 28],[24, 29],[25, 28],[26, 12],[27, 27],[29, 26],[28, 25]])

export const dark_SwitchThumb = n31
export const dark_SliderThumb = n31
export const dark_Tooltip = n31
export const dark_ProgressIndicator = n31
const n32 = t([[22, 67]])

export const dark_SheetOverlay = n32
export const dark_DialogOverlay = n32
export const dark_ModalOverlay = n32
export const dark_accent_SheetOverlay = n32
export const dark_accent_DialogOverlay = n32
export const dark_accent_ModalOverlay = n32
const n33 = t([[30, 39],[31, 38],[32, 40],[33, 40],[22, 47],[23, 47],[24, 47],[25, 47],[26, 46],[27, 45],[29, 44],[28, 43]])

export const light_accent_SwitchThumb = n33
export const light_accent_SliderThumb = n33
export const light_accent_Tooltip = n33
export const light_accent_ProgressIndicator = n33
const n34 = t([[30, 57],[31, 58],[32, 56],[33, 56],[22, 47],[23, 65],[24, 47],[25, 65],[26, 64],[27, 19],[29, 63],[28, 62]])

export const dark_accent_SwitchThumb = n34
export const dark_accent_SliderThumb = n34
export const dark_accent_Tooltip = n34
export const dark_accent_ProgressIndicator = n34