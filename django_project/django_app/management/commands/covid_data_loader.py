import csv
from django.core.management.base import BaseCommand
from ...models import DailyCases


class Command(BaseCommand):
    help = 'This loads a CSV in the format available here https://github.com/nytimes/covid-19-data, formats the data, and inserts it into a database for later retrieval.'

    def handle(self, *args, **options):
        raw_data = []
        daily_total_cases = {}
        with open('../public/NYTimesStates.csv', newline='') as csvfile:
            covid_data = csv.reader(csvfile, delimiter=',')

            # Skip first/header line
            next(covid_data)
            for row in covid_data:

                # Convert dates to eight-digit integers
                row[0] = int(''.join(row[0].split('-')))

                # Convert states to lower_case_with_underscore
                row[1] = '_'.join([word[0].lower() + word[1:] for word in row[1].split(' ')])

                # Daily case counts are given as total cumulative cases, stash these to convert to daily cases later
                if row[1] in daily_total_cases:
                    daily_total_cases[row[1]].append(row[3])
                else:
                    daily_total_cases[row[1]] = [row[3]]

                raw_data.append(row)

        # Calculate daily cases and replace the cumulative case counts with the daily case counts
        for state, state_data in daily_total_cases.items():
            for number in range(len(state_data) - 1, -1, -1):
                if number > 0:
                    state_data[number] = int(state_data[number]) - int(state_data[number - 1])
                else:
                    state_data[number] = int(state_data[number])

        # Store state-case count pairs for a given date as a dict associated with that date
        data_by_date = {}
        for row in raw_data:
            date = row[0]
            state_name = row[1]
            state_daily_case_count = daily_total_cases[state_name].pop(0)
            if date in data_by_date:
                data_by_date[date][state_name] = state_daily_case_count
            else:
                new_dict = dict([(state_name, state_daily_case_count)])
                data_by_date[date] = new_dict

        # Create a database entry for every date with case counts from each state
        for date, date_data in data_by_date.items():
            print(date)
            print(date_data)
            DailyCases.objects.get_or_create(
              date=date,
              alabama=date_data.get('alabama', 0),
              alaska=date_data.get('alaska', 0),
              arizona=date_data.get('arizona', 0),
              arkansas=date_data.get('arkansas', 0),
              california=date_data.get('california', 0),
              colorado=date_data.get('colorado', 0),
              connecticut=date_data.get('connecticut', 0),
              delaware=date_data.get('delaware', 0),
              florida=date_data.get('florida', 0),
              georgia=date_data.get('georgia', 0),
              hawaii=date_data.get('hawaii', 0),
              idaho=date_data.get('idaho', 0),
              illinois=date_data.get('illinois', 0),
              indiana=date_data.get('indiana', 0),
              iowa=date_data.get('iowa', 0),
              kansas=date_data.get('kansas', 0),
              kentucky=date_data.get('kentucky', 0),
              louisiana=date_data.get('louisiana', 0),
              maine=date_data.get('maine', 0),
              maryland=date_data.get('maryland', 0),
              massachusetts=date_data.get('massachusetts', 0),
              michigan=date_data.get('michigan', 0),
              minnesota=date_data.get('minnesota', 0),
              mississippi=date_data.get('mississippi', 0),
              missouri=date_data.get('missouri', 0),
              montana=date_data.get('montana', 0),
              nebraska=date_data.get('nebraska', 0),
              nevada=date_data.get('nevada', 0),
              new_hampshire=date_data.get('new_hampshire', 0),
              new_jersey=date_data.get('new_jersey', 0),
              new_mexico=date_data.get('new_mexico', 0),
              new_york=date_data.get('new_york', 0),
              north_carolina=date_data.get('north_carolina', 0),
              north_dakota=date_data.get('north_dakota', 0),
              ohio=date_data.get('ohio', 0),
              oklahoma=date_data.get('oklahoma', 0),
              oregon=date_data.get('oregon', 0),
              pennsylvania=date_data.get('pennsylvania', 0),
              rhode_island=date_data.get('rhode_island', 0),
              south_carolina=date_data.get('south_carolina', 0),
              south_dakota=date_data.get('south_dakota', 0),
              tennessee=date_data.get('tennessee', 0),
              texas=date_data.get('texas', 0),
              utah=date_data.get('utah', 0),
              vermont=date_data.get('vermont', 0),
              virginia=date_data.get('virginia', 0),
              washington=date_data.get('washington', 0),
              west_virginia=date_data.get('west_virginia', 0),
              wisconsin=date_data.get('wisconsin', 0),
              wyoming=date_data.get('wyoming', 0)
            )
