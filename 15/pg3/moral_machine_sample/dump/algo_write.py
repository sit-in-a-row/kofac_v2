choice1 = True
passengerList = [a,b,c]
pedestrianList = [d,e]
trafficImg = 'Green'

imageDictionary = {
    'baby.png': '아기',
    'dog.png': '강아지',
    'fat_female.png': '비만 여성',
    'fat_male.png': '비만 남성',
    'female.png': '여성',
    'male.png': '남성',
    'old_male.png': '노인 남성',
    'old_female.png': '노인 여성',
    'transparent.png': '투명 이미지',
    'traffic_red.png': '빨간 신호등',
    'traffic_green.png': '초록 신호등'
}

def victim_num(choice):

    result_victim_num = []

    if choice == choice1:
        if len(passengerList) > len(pedestrianList):
            result_victim_num.append("많은 사람 살림")
        else:
            result_victim_num.append("적은 사람 살림")
    else:
        if len(passengerList) > len(pedestrianList):
            result_victim_num.append("적은 사람 살림")
        else:
            result_victim_num.append("많은 사람 살림")

    return result_victim_num

def passenger_vs_pedestrian(choice):

    passenger_vs_pedestrian_list = []

    if choice == choice1:
        passenger_vs_pedestrian_list.append("탑승자")
    else:
        passenger_vs_pedestrian_list.append("보행자")

    return passenger_vs_pedestrian_list


def young_vs_old(choice):

    young_vs_old_list = []

    for pedestrian, passenger in range(enumerate(pedestrianList, passengerList)):
        if ('어린이' in pedestrian and '노인' in passenger) or ('노인' in pedestrian and '어린이' in passenger):
            if choice == choice1:
                young_vs_old_list.append('노인')
            else:
                young_vs_old_list.append('어린이')
        else:
            young_vs_old_list.append('NULL')

def check_outlaw(trafficImg):

    outlaw_result = []

    if trafficImg == 'green':
        outlaw_result.append('green')
    else:
        outlaw_result.append('red')

def check_puppy(choice):

    puppy_status_list = []

    for pedestrian, passenger in range(enumerate(pedestrianList, passengerList)):
        if ('강아지' in pedestrian and '강아지' in passenger):
            puppy_status_list.append('NULL')
        
        elif ('강아지' in pedestrian):
            if choice == choice1:
                puppy_status_list.append('강아지 죽음')

        elif ('강아지' in passenger):
            if choice == choice1:
                puppy_status_list.append('강아지 삶')
            
        else:
            puppy_status_list.append('NULL')

var totalScenarioCount = totalList.length;
var currentScenarioCount = 1;

var victimMany = 0;
var victimLess = 0;

var passengerDead = 0;
var pedestrianDead = 0;

var youngImportant = 0;
var elderImportant = 0;

var outlawLive = 0;
var outlawDead = 0;

var puppyLive = 0;
var puppyDead = 0;