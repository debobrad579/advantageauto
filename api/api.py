from flask import Flask, request, jsonify
from flask_cors import CORS
from email.message import EmailMessage
import ssl
import smtplib
from datetime import datetime

app = Flask(__name__)
CORS(app)


@app.route("/api", methods=["POST", "OPTIONS"])
def api():
    try:
        if request.method == 'OPTIONS':
            return "", 200
        
        data = request.get_json()

        email_sender = "bradydeboer195@gmail.com"
        password = "lgfckgcjasifjian"
        email_receiver = "thebradster7.bd@gmail.com"
        subject = "Appointment Request"
        body = f"""
Client Information:
Name: {data['name']}
Phone: {data['phone']}
Email: {data['email']}

Vehicle Information:
Year: {data['year']}
Make: {data['make']}
Model: {data['model']}

Requested Service Information:
Requested Services: {format_services(data['service1'], data['service2'], data['service3'])}
Requested Date: {format_date(data['date'])}
Requested Time: {format_time(data['time'])}

Additional Information:
{data['additional']}
        """
        em = EmailMessage()
        em["From"] = email_sender
        em["To"] = email_receiver
        em["Subject"] = subject
        em.set_content(body)
        context = ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
            smtp.login(email_sender, password)
            smtp.sendmail(email_sender, email_receiver, em.as_string())
        
        return jsonify({"success": True})
    except:
        return jsonify({"success": False})


def format_services(*services):
    return ", ".join([i.replace("+", " ") for i in services if i is not None])


def format_date(date):
    try:
        date_object = datetime.strptime(date, "%Y-%m-%d")
        month_names = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ]
        return f"{month_names[date_object.month - 1]} {date_object.day}, {date_object.year}"
    except ValueError:
        return date


def format_time(time):
    try:
        hour, minute = map(int, time.split(":"))
        return f"{hour % 12 if hour % 12 != 0 else 12}:{minute:02d} {'AM' if hour < 12 else 'PM'}"
    except ValueError:
        return time
     

if __name__ == '__main__':
    app.run(debug=True)
