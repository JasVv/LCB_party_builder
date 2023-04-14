export const selectSinColorCss = (sin: string) => {
  return sin == "憤怒" ? "font_color_wrath" : 
  sin == "色欲" ? "font_color_lust" :
  sin == "怠惰" ? "font_color_sloth" :
  sin == "暴食" ? "font_color_gluttony" :
  sin == "憂鬱" ? "font_color_gloom" :
  sin == "傲慢" ? "font_color_pride" : 
  sin == "嫉妬" ? "font_color_envy" : ""
} 
