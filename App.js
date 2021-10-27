import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Rating, AirbnbRating} from 'react-native-ratings'; // star ratings component

import {Card, ListItem, Button, Icon} from 'react-native-elements'; // react-native-elements

const reviews = ['그냥그래요', '별로에요', '보통이에요', '좋아요', '최고에요!'];

const _movies = [
  {
    title: '한공주',
    ratings: 4.32,
    showingYear: 2011, // need an update
    reviews: [{name: '어둠의암살자', comment: '굿', rating: 3}],
    description: `원래 있던 학교의 담임선생인 이난도(조대희)는 우선 한공주(천우희)를 자기 어머니 집에 데려다 놓는데, 담임선생의 어머니 '조여사'(이영란)는 그녀가 임신을 해서 그러는 것 아닌가 하는 의심을 노골적으로 나타내며 공주를 박대하다시피 한다. 그 날 난도는 파출소장과 열애 중임을 밝히는 조여사에게 짜증을 내고, 공주는 연락이 되지 않는 엄마에게 배신감을 느낀다.`,
    img: '',
  },
  {
    title: '파업전야',
    ratings: 3.98,
    showingYear: 2011, // need an update
    reviews: [{name: '미래파수꾼', comment: '괜찮은 거 같아요', rating: 4}],
    description: `영화는 1987년 노동자 대투쟁이 진행 중인 1987년에 시작한다. 배식을 받아 식사를 하고 있던 노동자들 사이에서 한 사람이 식판을 내동댕이쳐 버린다. 놀란 동료들 앞에서 그는 우리가 회사에 기여하는 것에 비하여 턱없이 부당한 대우를 받고 있다며 성토하지만 곧 끌려나가 버린다. 소동이 끝난 후 회사 간부는 노동자들에게 다시 식사를 할 것을 재촉하고, 해는 1988년으로 바뀐다.`,
    img: '',
  },
  {
    title: '파수꾼',
    ratings: 3.97,
    showingYear: 2011,
    reviews: [{name: '코딩몬스터', comment: '내 인생 최고의 영화', rating: 5}],
    description: `한 소년이 죽었다. 평소 아들에게 무심했던 소년의 아버지(조성하)는 아들의 갑작스런 공백에 매우 혼란스러워하며 뒤늦은 죄책감과 무력함에, 아들 기태(이제훈)[2] 의 죽음을 뒤쫓기 시작한다. 아들의 책상 서랍 안, 소중하게 보관되어 있던 사진 속에`,
    img: '',
  },
  {
    title: '토요근무',
    ratings: 3.53,
    showingYear: 2011,
    reviews: [{name: '미래소년', comment: '...', rating: 3}],
    description: `인터넷 AS 기사 김도연은 어린 아이(본명 김선아)가 있는 집에 일하러 가게 된다. 아이는 25살 미혼모 어머니와 함께 살고 있었는데, 어머니가 오지 않아서 무섭다며 도연에게 징징을 시전한다. 도연은 어쩔 수 없이 아이와 놀아주게 되고 사비로 짜장면을 시킨다. 그 후 한참이 지나도 엄마는 오지 않았고, 근무가 길어지는 바람에 여자친구와의 데이트 약속도 깨졌고 결국 여자친구와 헤어지게 된다.
    `,
    img: '',
  },
  {
    title: '천국보다 낯선 (Stranger Than Paradise)',
    ratings: 4.45,
    showingYear: 1984,
    reviews: [
      {
        name: '맥아이폰',
        comment: '이런 영화가 두 번 다시 나올 수 있을까?',
        rating: 5,
      },
    ],
    description: `인터넷 AS 기사 김도연은 어린 아이(본명 김선아)가 있는 집에 일하러 가게 된다. 아이는 25살 미혼모 어머니와 함께 살고 있었는데, 어머니가 오지 않아서 무섭다며 도연에게 징징을 시전한다. 도연은 어쩔 수 없이 아이와 놀아주게 되고 사비로 짜장면을 시킨다. 그 후 한참이 지나도 엄마는 오지 않았고, 근무가 길어지는 바람에 여자친구와의 데이트 약속도 깨졌고 결국 여자친구와 헤어지게 된다.뉴욕 빈민가에 사는 윌리는 헝가리 부다페스트에 사는 사촌 동생 에바에게 편지를 받고 열흘간 자신의 집에서 묵게 해 달라는 고모 로테의 전화를 받는다. 윌리는 말도 안 된다는 듯이 받아들이고 에바를 불청객 취급했지만, 그 관계는 점차 개선되고 막상 열흘이 다 지나 에바가 떠나게 되자 걱정과 아쉬움을 느끼게 된다.`,
    img: '',
  },
  {
    title: '죄 많은 소녀',
    ratings: 3.99,
    showingYear: 2018,
    reviews: [
      {
        name: '메디테이션',
        comment: '흥미로운 영화였습니다.',
        rating: 4,
      },
    ],
    description: `친구가 사라지고, 모두가 나를 의심한다. 같은 반 친구 경민의 갑작스런 실종으로 마지막까지 함께 있었던 영희(전여빈)는 가해자로 지목된다. 딸이 죽은 이유를 알아야하는 경민의 엄마, 사건의 진실을 밝혀야 하는 형사, 친구의 진심을 숨겨야 하는 한솔, 학생이 죽은 원인을 찾아야 하는 담임 선생님까지. 주변의 모든 사람들이 영희를 의심한다. 죄 많은 소녀가 된 영희는 결백을 증명해야만 하는데...`,
    img: '',
  },
  {
    title: '족구왕',
    ratings: 4.67,
    showingYear: 2014,
    reviews: [
      {
        name: '잘보고 갑니다',
        comment: '진짜 잘 보고 갑니다 ;-)',
        rating: 5,
      },
    ],
    description: `영화의 배경은 2013년 봄이다. 족구를 좋아하는 중앙대 식품영양학과 복학생 만섭은 병장 만기전역 후 학교에 돌아오자마자 족구장을 찾지만 테니스장으로 바뀌어 있는 모습에 실망한다. 만섭은 기숙사 룸메이트로 과 선배이자 공무원 시험 준비생 형국을 만나고 형국은 만섭에게 대뜸 꿈이 뭐냐 묻는다. 형국은 아직 생각 중이라는 만섭에게 “공무원 시험 준비하라”고 충고한다. 그러나 만섭은 형국에게 공무원에는 관심이 없고 연애를 하고 싶다고 받아친다.`,
    img: '',
  },
  {
    title: '죽거나 혹은 나쁘거나',
    ratings: 3.54,
    showingYear: 2000,
    reviews: [
      {
        name: '류쨩',
        comment: '류승완 감독 멋지다...',
        rating: 5,
      },
    ],
    description: `졸업을 앞둔 공업고등학교 3학년 학생 석환(류승완 분)과 성빈(박성빈 분)이 당구장에 가지만 평소 사이가 나빴던 예술고등학교 학생들과 시비가 붙게 된다. 특히 예술고등학생 패거리들 중의 하나인 현수(김수현 분)는 계속해서 공고생들을 도발하고, 다혈질인 석환은 이들에게 덤벼들려다 성빈의 만류로 참기를 반복한다. 그러던 도중 석환과 성빈의 후배인 찐따라는 별명의 공업고등학생이 당구장에 피투성이가 된 채 찾아오는데, 이전에 현수와 오락실에서 시비가 붙었고, 현수에게 일방적으로 얻어맞았기 때문이라는 사실을 알고 석환은 격노한다.`,
    img: '',
  },
  {
    title: '잔칫날',
    ratings: 4.03,
    showingYear: 2020,
    reviews: [
      {
        name: '잔칫날 최고',
        comment: '잔칫날 최고입니다...',
        rating: 5,
      },
    ],
    description: `무명 MC 경만(하준)은 각종 행사 일을 하며 동생 경미(소주연)와 함께 오랫동안 병원에 입원해 있는 아버지를 간호 중이다. 하지만 갑자기 아버지가 세상을 떠나고, 경만은 슬퍼할 겨를도 없이 장례비용조차 없는 빡빡한 현실을 마주하게 된다. 동생 몰래 장례식 비용을 마련하기 위해 지방으로 생신 축하연 행사를 간 경만은 남편을 잃은 후 웃음도 잃은 팔순의 어머니를 웃게 해달라는 일식(정인기)의 바람을 들어주기 위해 최선을 다해 재롱을 피운다. 가장 울고 싶은 날 가장 최선을 다해 환한 웃음을 지어야 하는 경만은 팔순 잔치에서 예기치 못한 소동에 휘말리며 발이 묶이게 된다. 한편 홀로 장례식장을 지키는 경미는 상주인 오빠의 부재로 아무것도 결정하지 못하고 주변의 잔소리만 듣게 되는데…`,
    img: '',
  },
  {
    title: '잉투기',
    ratings: 3.34,
    showingYear: 2013,
    reviews: [
      {
        name: '우점밍',
        comment: '제 이름과 비슷해서 봤는데, 흥미로웠습니다',
        rating: 4,
      },
    ],
    description: `주인공 박태식(칡콩팥)(엄태구)은 나이가 30줄에 다다른, 취업 준비도 하지 않고 잉여롭게 살아가는 청년. 온라인 게임 아이템 판매차 거래를 위해 찾은 간석 오거리 인근 공원에서 평소 격투갤러리에서 언쟁을 벌였던 도육환(젖존슨)에게 기습공격을 당하게 된다. 이는 태식을 현피로 끌어들이기 위한 젖존슨의 계략이었던 것. 미리 대기해있던 갤러들과 시민들에 의해 영상이 온라인에 유포되고 태식은 한순간에 웃음거리로 전락한다.`,
    img: '',
  },
  {
    title: '인어할머니와 선장',
    ratings: 3.34,
    showingYear: 2013,
    reviews: [
      {
        name: '레몬에디',
        comment: '자연이란 무엇인가 생각하는 것이었습니다.',
        rating: 5,
      },
    ],
    description: `신비의 섬 울릉도, 91세 인어 할머니를 만나다! 울릉도 앞바다. 한국 최고령 해녀 할머니는 오늘도 테왁을 끼고 물에 들어간다. 할머니 인어의 물질이 시작되면 그 주위를 낡은 목선 한 척이 맴돈다. 문어잡이 낚싯줄을 드리운 양 선장의 배다. 10년째 바닷길을 동행한 두 사람은 말 없이도 손발이 척척 맞는다.`,
    img: '',
  },
  {
    title: '워낭소리',
    ratings: 4.66,
    showingYear: 2009,
    reviews: [
      {
        name: '자연친화성',
        comment: '자연에 대한 사랑을 잊지 맙시다 여러분',
        rating: 5,
      },
    ],
    description: `등장인물은 40년을 산 늙은 소 "누렁이"(1967∼2008)와 팔순 노인 최원균 씨와 이삼순 씨 부부. 물론 다큐멘터리니까 본인 역. 40년을 동고동락하며 인생의 무게를 짊어져온 소와 인간이 마지막으로 함께 보낸 1년의 시간을 담고 있다.`,
    img: '',
  },
  {
    title: '윤희에게',
    ratings: 4.34,
    showingYear: 2019,
    reviews: [
      {
        name: '러브꾼',
        comment:
          '사랑이란 무엇인가? 그 질문에 대한 답을 할 수 있는 영화라고 생각합니다.',
        rating: 5,
      },
    ],
    description: `겨울, 모녀는 단둘이 산다. 고등학생 딸은 우연히 엄마에게 온 편지를 읽고 그녀가 한평생 숨겨온 비밀을 알아챈다. 그렇게 엄마와 딸의 아름다운 여행이 시작된다. 하얗게 눈이 내린 고요한 마을 오타루, 이곳에서 모녀는 화해의 길로 들어서는 한편, 설레는 추억을 쌓아 나간다. 거기에 엄마의 이루지 못한 지난 사랑이 있고 딸이 이루어 나갈 새로운 사랑이 있다. 반면 이들을 맞이하게 되는 이가 있다. 얼마 전 아버지를 잃고 고모와 단둘이 살며 애도의 시간을 보내고 있는 ‘누군가’가 바로 모녀의 삶에 활력을 불어넣어 줄 비밀의 인물이다. 《윤희에게》는 전작 《메리 크리스마스 미스터 모》에서 부자간의 소박하고 감동적인 정서를 전해 국내외로 주목받았던 재능 있는 감독 임대형의 두 번째 장편이다. 감독은 전작에서 유머러스하면서도 애상 가득한 분위기로 죽음이라는 문제를 다룬 것처럼, 이번에는 소박하고 애틋하면서도 온기 있게 사랑의 상실과 복원에 관하여 표현해낸다. 정갈하게 전개되는 이야기와 정서, 신구 혹은 국내외의 조화가 돋보이는 배우들의 주목할 만한 연기, 풍경의 이국적 분위기 등이 어우러져 이 영화의 매력인 온화함을 고취시킨다. 2018 부산국제영화제 장편 극영화 제작지원펀드 선정작이다.`,
    img: '',
  },
  {
    title: '우주의 크리스마스',
    ratings: 3.99,
    showingYear: 2016,
    reviews: [
      {
        name: '데이드리머',
        comment:
          '꿈을 꾸고 살아 가는 것, 그리고 그 안에 사랑 한 스푼. 최고의 보양식!',
        rating: 5,
      },
    ],
    description: `이루지 못한 꿈을 간직한, 서른여덟 성우주. 미련 가득한 자신의 과거와 닮아있는 열아홉 성우주, 스물여섯 성우주를 우연히 만나며 사랑했지만 떠나보낼 수 밖에 없었던 한 남자와 잊고 있었던 꿈을 다시 떠올리게 된다. 가슴 한 켠 간직했던 지난 흔적을 더듬어 자신의 과거이자 그들의 현재를 보듬어주려는 그녀. 두 명의 우주를 통해 놓쳤던 꿈과 사랑을 향해 작은 기적을 만들어가기 시작하는데…`,
    img: '',
  },
  {
    title: '용서받지 못한 자',
    ratings: 4.23,
    showingYear: 2016,
    reviews: [
      {
        name: '검은모자',
        comment: '옥에 티가 있긴 하지만, 좋은 영화입니다 5점!',
        rating: 5,
      },
    ],
    description: `2년여 동안 나름 군기반장으로서 모범적인 군생활을 했다고 자부하는 병장[3] 태정은 중학교 동창인 승영이 내무반 신참으로 들어오면서 평탄치가 않게 된다. 상관의 군화에 매일같이 물광을 내 갖다 바치는 것이 당연하고 고참은 신참 팬티를 뺏어 입어도 당당할 수 있는 군대 특유의 부조리함을 받아들이지 못하는 승영은 사사건건 문제를 일으키고 태정은 친구라는 이유로 승영을 계속 감싸주지만 자신까지 곤란한 상황에 몰리기가 일쑤다. 시키는 대로 하는 것이 편하다는 태정의 충고와 걱정에도 아랑곳 않고 승영은 자신이 고참이 되면 이런 나쁜 관행들을 다 바꿀 자신이 있다고 큰소리를 치지만 태정에겐 그런 승영이 답답하고 자신의 제대 후 홀로 남겨질 친구의 앞날이 걱정될 뿐이다.`,
    img: '',
  },
];

function ListScreen({navigation, route}) {
  const [movies, setMovies] = React.useState(
    _movies.sort((a, b) => a.ratings < b.ratings),
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMovies([..._movies]);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView>
      {movies.map((movie, index) => (
        <Card key={movie.title}>
          <Card.Title>
            {movie.title} {movie.ratings} ({movie.showingYear})
          </Card.Title>
          <Card.Divider />
          <Text style={{marginBottom: 10}}>{movie.description}</Text>
          <Button
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 10,
            }}
            title="RATING NOW"
            onPress={() => navigation.navigate('Rating', index)}
          />
          <Button
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="COMMENTING NOW"
            onPress={() => navigation.navigate('Comments', index)}
          />
        </Card>
      ))}
    </ScrollView>
  );
}

var tempNumber = 0;

function ratingCompleted(rating) {
  const random = Math.round(Math.random() * 20) + 20;
  const result = parseFloat((rating / random).toFixed(2));
  const isMinus = Math.round(Math.random() * 100) + 1 > 50 ? true : false;

  tempNumber = isMinus ? -1 * result : result;
}

function myGoback(index) {
  _movies[index].ratings = (
    parseFloat(_movies[index].ratings) + tempNumber
  ).toFixed(2);

  tempNumber = 0;

  _movies.sort((a, b) => a.ratings < b.ratings);
}

function RatingScreen({navigation, route}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Detail Screen</Text>
      <AirbnbRating reviews={reviews} onFinishRating={ratingCompleted} />
      <Button
        buttonStyle={{
          width: '100%',
        }}
        title="Rating 완료"
        onPress={() => {
          myGoback(route.params);
          navigation.goBack(_movies);
        }}
      />
    </View>
  );
}

function CommentsScreen({navigation, route}) {
  const clickedIndex = route['params'];
  const randomNames = [
    '티모와함께춤을',
    '게임을시작해',
    '질서보통',
    '이력숩',
    '이솝킬러',
    '우히',
    '에쎕',
    '하딩거',
    '솔샤르',
    '상태관리',
    '리덕스킬러',
    '시리',
    '쉬리',
  ];
  const [value, onChangeText] = React.useState('감상평을 입력해보세요!');

  const [movies, setMovies] = React.useState([..._movies]);

  function addComment() {
    _movies[clickedIndex]['reviews'].push({
      name: randomNames[Math.round(Math.random() * randomNames.length)],
      comment: value,
      rating: 5,
    });

    setMovies([..._movies]);
  }

  return (
    <ScrollView>
      <TextInput
        multiline
        numberOfLines={4}
        onChangeText={text => {
          onChangeText(text);
        }}
        value={value}
        style={{padding: 10}}
      />
      <Button title="확인" onPress={() => addComment()} />
      {movies[clickedIndex]['reviews'].map((comment, index) => (
        <Card key={comment.comment}>
          <Card.Title>작성자: {comment.name}</Card.Title>
          <Card.Divider />
          <Text style={{marginBottom: 10}}>{comment.comment}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Rating" component={RatingScreen} />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
