import CONSTANTS

HEADER_SIZE = CONSTANTS.HEADER_SIZE
DELIMITER = CONSTANTS.DELIMITER

def lsb_encrypter(text_to_hide, image_file, steg_image_file):
    image_byte_counter = 0
    new_image_data = bytearray()
    original_image = image_file.read()

    def read_header():
        nonlocal image_byte_counter
        for x in range(HEADER_SIZE):
            new_image_data.append(original_image[x])
            image_byte_counter += 1

    def hide_text_size():
        sz = len(text_to_hide)
        s_sz = str(sz)
        s_sz += DELIMITER 
        do_steg(s_sz)

    def do_steg(steg_text):
        nonlocal image_byte_counter
        for ch in steg_text:
            current_char_binary = '{0:08b}'.format(ord(ch))
            for bit in current_char_binary:
                current_image_binary = '{0:08b}'.format(original_image[image_byte_counter])
                new_byte_binary = current_image_binary[:7] + bit
                new_byte = int(new_byte_binary, 2)
                new_image_data.append(new_byte)
                image_byte_counter += 1

    def copy_rest():
        new_image_data.extend(original_image[image_byte_counter:])

    read_header()
    hide_text_size()
    do_steg(text_to_hide)
    copy_rest()

    return bytes(new_image_data)  
