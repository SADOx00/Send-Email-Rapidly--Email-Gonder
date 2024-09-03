import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr

class EmailSender:
    def __init__(self, smtp_server, smtp_port, username, password, default_sender):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.username = username
        self.password = password
        self.default_sender = default_sender

    def send_email(self, recipient, subject, message_body):
        try:

            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.username, self.password)


                msg = MIMEMultipart()
                msg['From'] = formataddr(('Sender', self.default_sender))
                msg['To'] = recipient
                msg['Subject'] = subject


                msg.attach(MIMEText(message_body, 'plain'))


                server.send_message(msg)

            print('Email sent successfully!')
            return True
        except Exception as e:
            return False
            print(f'Failed to send email: {str(e)}')

# Kullanım örneği
def send(my_email, app_password,target_email,baslik,icerik):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    username = my_email
    password = app_password
    default_sender = my_email
    recipient = target_email
    subject = baslik
    message_body = icerik
    print(f"email:{my_email}  passwor:{password} başlık:{baslik} kime:{target_email} içerik:{icerik}")
    a = email_sender = EmailSender(smtp_server, smtp_port, username, password, default_sender)
    b = email_sender.send_email(recipient, subject, message_body)
    if not b or not a:
        return False
    else:
        return True
