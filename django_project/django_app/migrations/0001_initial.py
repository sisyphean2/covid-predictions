# Generated by Django 3.2.7 on 2021-10-15 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DailyCases',
            fields=[
                ('date', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('alabama', models.IntegerField(default=0)),
                ('alaska', models.IntegerField(default=0)),
                ('arizona', models.IntegerField(default=0)),
                ('arkansas', models.IntegerField(default=0)),
                ('california', models.IntegerField(default=0)),
                ('colorado', models.IntegerField(default=0)),
                ('connecticut', models.IntegerField(default=0)),
                ('delaware', models.IntegerField(default=0)),
                ('florida', models.IntegerField(default=0)),
                ('georgia', models.IntegerField(default=0)),
                ('hawaii', models.IntegerField(default=0)),
                ('idaho', models.IntegerField(default=0)),
                ('illinois', models.IntegerField(default=0)),
                ('indiana', models.IntegerField(default=0)),
                ('iowa', models.IntegerField(default=0)),
                ('kansas', models.IntegerField(default=0)),
                ('kentucky', models.IntegerField(default=0)),
                ('louisiana', models.IntegerField(default=0)),
                ('maine', models.IntegerField(default=0)),
                ('maryland', models.IntegerField(default=0)),
                ('massachusetts', models.IntegerField(default=0)),
                ('michigan', models.IntegerField(default=0)),
                ('minnesota', models.IntegerField(default=0)),
                ('mississippi', models.IntegerField(default=0)),
                ('missouri', models.IntegerField(default=0)),
                ('montana', models.IntegerField(default=0)),
                ('nebraska', models.IntegerField(default=0)),
                ('nevada', models.IntegerField(default=0)),
                ('new_hampshire', models.IntegerField(default=0)),
                ('new_jersey', models.IntegerField(default=0)),
                ('new_mexico', models.IntegerField(default=0)),
                ('new_york', models.IntegerField(default=0)),
                ('north_carolina', models.IntegerField(default=0)),
                ('north_dakota', models.IntegerField(default=0)),
                ('ohio', models.IntegerField(default=0)),
                ('oklahoma', models.IntegerField(default=0)),
                ('oregon', models.IntegerField(default=0)),
                ('pennsylvania', models.IntegerField(default=0)),
                ('rhode_island', models.IntegerField(default=0)),
                ('south_carolina', models.IntegerField(default=0)),
                ('south_dakota', models.IntegerField(default=0)),
                ('tennessee', models.IntegerField(default=0)),
                ('texas', models.IntegerField(default=0)),
                ('utah', models.IntegerField(default=0)),
                ('vermont', models.IntegerField(default=0)),
                ('virginia', models.IntegerField(default=0)),
                ('washington', models.IntegerField(default=0)),
                ('west_virginia', models.IntegerField(default=0)),
                ('wisconsin', models.IntegerField(default=0)),
                ('wyoming', models.IntegerField(default=0)),
            ],
        ),
    ]