import csv

def getCsv():
    with open(r"C:\Users\Mitch\Downloads\bankData.csv") as csvFile:
        rows = csv.reader(csvFile, delimiter=',')

        data = []

        i = 0

        for row in rows:
            if (i > 3):
                newRow = [row[1], row[2], row[4], row[5], row[6]]
                data.append(newRow)
            i+=1

        return data
