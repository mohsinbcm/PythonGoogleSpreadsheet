from flask import render_template
from flask import Flask
from flask import request
from flask import jsonify
import gspread


# Login with your Google account
gc = gspread.login('email@domain.com', '**********')

app = Flask(__name__)
# Index page
@app.route("/")
def hello():
    sheet1 = gc.open_by_url('https://docs.google.com/spreadsheet/ccc?key=*********************************************')
    worksheet = sheet1.get_worksheet(0)    
    return render_template('index.html', title = worksheet.title, data =worksheet.get_all_values())
    
#AJAX CALL FOR NEW SPREADSHEET TAB
@app.route('/getspreadsheetbyurl', methods = ['POST'])
def getspreadsheetbyurl():
    url = request.form['url']
    sheet2 = gc.open_by_url(url)
    worksheet2 = sheet2.get_worksheet(0)    
    return jsonify(dasta=worksheet2.get_all_values(),title = worksheet2.title)

if __name__ == "__main__":
    app.run()

    
