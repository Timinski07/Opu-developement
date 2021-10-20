import pytesseract as tess 
tess.pytesseract.tesseract_cmd = r'C:\OpuDev\Tesseract-OCR\tesseract.exe'
from PIL import Image
import pyautogui
import time
import json
import os
import usefullFuncs


def scan_picture():
    while(True):
        try:
            pyautogui.screenshot('C:\\OpuDev\\Docs\\text.png')
        except Exception as ex:
            print("standy-mode")
        img = Image.open('C:\\OpuDev\\Docs\\text.png')
        text = tess.image_to_string(img)
        usefullFuncs.Usefull_Functions.check_for_words(text, "C:\\OpuDev\\notWrite.json", "forbidden", "git-bash.exe", 1);
        #os.remove('C:\\Opu\\Docs\\text.png')
scan_picture()