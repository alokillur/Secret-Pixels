import CONSTANTS

HEADER_SIZE = 54  
DELIMITER = "$"

def lbs_decrypter(image_file):
    number_of_chars_in_text = 0
    original_text = ''

    for i in range(HEADER_SIZE):
        image_file.read(1)

    def get_char():
        new_byte = ''
        for bit in range(8):
            byte = image_file.read(1)
            new_byte += str(ord(byte) & 0x01)
            
        n = int(new_byte, 2)
        desteg_char = chr(n)
        return desteg_char
    

    def get_text_size():
        nonlocal number_of_chars_in_text
        curr_ch = get_char()
        s_sz = ''

        while curr_ch != DELIMITER:
            s_sz += curr_ch
            curr_ch = get_char()

        if not s_sz.isdigit():
            return False

        if s_sz == '0':
            return False

        if s_sz:
            number_of_chars_in_text = int(s_sz)
            return True

    def read_stega_text():
        nonlocal original_text
        decoded_chars = 0
        while decoded_chars < number_of_chars_in_text:
            original_text += get_char()
            decoded_chars += 1

    if not get_text_size():
        return "No Content!"

    read_stega_text()

    return original_text
