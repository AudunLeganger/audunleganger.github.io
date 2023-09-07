import random


def lag_dører():
    return ["ingenting", "ingenting", "ingenting"]


def plasser_premie_tilfeldig():
    indeks = random.randint(0, 2)
    dører[indeks] = "premie"


def velg_tilfeldig_dør():
    indeks = random.randint(0, 2)
    return indeks


for i in range(0, 5):
    dører = lag_dører()
    plasser_premie_tilfeldig()
    valgt_dør = velg_tilfeldig_dør()
