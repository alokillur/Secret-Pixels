import CONSTANTS

HEADER_SIZE = CONSTANTS.HEADER_SIZE
DELIMITER= CONSTANTS.DELIMITER

# User Configurations
TextToHide = "I Am Hrithik!!"
ImageFile = "test5.jpg"
StegImageFile = "hidden_test5.jpg"

class LSBEncrypter(object):

    def __init__(self):
        self.image_byte_counter = 0
        self.new_image_data = bytearray()
        self.original_image = b''
        self.text_to_hide = ''

    def open_image(self):
        # Open the image file
        with open(ImageFile, "rb") as f:
            self.original_image = f.read()

    # Reading first chunk of the file - we don't want to overwrite the header
    def read_header(self):
        for x in range(HEADER_SIZE):
            self.new_image_data.append(self.original_image[x])
            self.image_byte_counter += 1

    def hide_text_size(self):
        sz = len(self.text_to_hide)
        s_sz = str(sz)
        s_sz += DELIMITER  # s_sz now equal to size of text to hide + Delimiter
        self.do_steg(s_sz)

    # Hides the text in the image.
    # Does that by replacing the bytes LSB (Least significant bit) to be our bit
    def do_steg(self, steg_text):
        # Goes through the text we want to hide, char by char
        for ch in steg_text:
            current_char_binary = '{0:08b}'.format(ord(ch))  # Gets the binary value of current character

            # Goes through current char binary - bit by bit
            for bit in current_char_binary:
                # Gets the binary value of original image byte
                current_image_binary = '{0:08b}'.format(self.original_image[self.image_byte_counter])

                # Create the new byte with the LSB set to our bit
                new_byte_binary = current_image_binary[:7] + bit
                new_byte = int(new_byte_binary, 2)

                # Adds new byte to output
                self.new_image_data.append(new_byte)
                self.image_byte_counter += 1

    def copy_rest(self):
        # Copies what's left of the file
        self.new_image_data.extend(self.original_image[self.image_byte_counter:])

    def close_file(self):
        with open(StegImageFile, "wb") as out:
            out.write(self.new_image_data)

    def run(self, stega_text):
        self.text_to_hide = stega_text
        self.open_image()
        self.read_header()
        self.hide_text_size()
        self.do_steg(self.text_to_hide)
        self.copy_rest()
        self.close_file()

def main():
    global TextToHide
    stega_instance = LSBEncrypter()
    stega_instance.run(TextToHide)
    print("Successfully finished hiding text")

if __name__ == '__main__':
    main()
