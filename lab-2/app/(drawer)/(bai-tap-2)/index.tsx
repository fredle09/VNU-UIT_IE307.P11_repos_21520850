import { useCallback, useState } from 'react';
import { FlatList, Image, SafeAreaView, SectionList, View, ImageBackground } from 'react-native';

import { fruits_vegetables, workouts } from './data';

import { CardWithCheckbox } from '~/components/bai-tap-2';
import { Badge } from '~/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

export default function BaiTap2Screen() {
  const [displayTextList, setDisplayTextList] = useState<
    (string | { icon: string; text: string })[]
  >([]);
  const [tabValue, setTabValue] = useState('workouts');
  const setIsChoose = useCallback(
    (value: boolean, type: string | { icon: string; text: string }) => {
      if (value) {
        setDisplayTextList((prev) => [...prev, type]);
      } else {
        setDisplayTextList((prev) =>
          prev.filter((value) => JSON.stringify(value) !== JSON.stringify(type))
        );
      }
    },
    []
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-1 gap-2 px-4">
        <View>
          <Text className="text-3xl font-bold">Result</Text>
          <View
            className={cn(
              'border-1 flex h-36 flex-row flex-wrap gap-1.5',
              'overflow-scroll rounded-md border-zinc-100 p-1.5 dark:border-zinc-900'
            )}>
            {displayTextList.map((value) => (
              <Badge
                key={JSON.stringify(value)}
                variant="secondary"
                className="flex flex-row items-center gap-1">
                {typeof value === 'string' ? (
                  <Text>{value}</Text>
                ) : (
                  <>
                    <Image
                      className="-ml-0.5"
                      source={{ uri: value.icon }}
                      style={{ width: 12, height: 12 }}
                    />
                    <Text>{value.text}</Text>
                  </>
                )}
              </Badge>
            ))}
          </View>
        </View>
        <Tabs value={tabValue} onValueChange={setTabValue} className="flex-1 gap-4">
          <TabsList className="w-full flex-row">
            <TabsTrigger value="workouts" className="flex-1">
              <Text>Workouts</Text>
            </TabsTrigger>
            <TabsTrigger value="fruits_vegetables" className="flex-1">
              <Text>Fruits Vegetables</Text>
            </TabsTrigger>
          </TabsList>

          <TabsContent className="-mx-4 flex-1" value="workouts">
            <ImageBackground
              source={{
                uri: 'https://th.bing.com/th/id/OIP.M8nbdX0MwxeYiOHZ3hRYHAAAAA?rs=1&pid=ImgDetMain',
              }}
              resizeMode="cover"
              blurRadius={10}>
              <View className="dark:bg-black/75">
                <FlatList
                  className="mx-4"
                  data={workouts}
                  renderItem={({ item: { type } }) => (
                    <CardWithCheckbox
                      value={type}
                      isChoose={displayTextList.some(
                        (item) => typeof item === 'string' && item === type
                      )}
                      setIsChoose={(value) => setIsChoose(value, type)}
                    />
                  )}
                  ListHeaderComponent={<Text className="pt-4 text-3xl font-bold">Workouts</Text>}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </ImageBackground>
          </TabsContent>

          <TabsContent className="-mx-4 flex-1" value="fruits_vegetables">
            <ImageBackground
              source={{
                uri: 'https://th.bing.com/th/id/OIP.cL0hMjLYokcGu6Ad7jhB5AHaE8?rs=1&pid=ImgDetMain',
              }}
              resizeMode="cover"
              blurRadius={10}>
              <View className="bg-muted/75 dark:bg-black/50">
                <SectionList
                  className="mx-4"
                  sections={fruits_vegetables}
                  keyExtractor={(item, index) => JSON.stringify(item) + index}
                  ListHeaderComponent={
                    <Text className="mt-4 text-3xl font-bold">
                      {fruits_vegetables.map((item) => item.title).join(' ')}
                    </Text>
                  }
                  renderSectionHeader={({ section: { title, url: uri } }) => (
                    <View className="mt-6 flex flex-row items-center gap-2">
                      <Text className="text-xl font-bold">{title}</Text>
                      <Image className="object-cover" source={{ uri }} height={24} width={24} />
                    </View>
                  )}
                  stickySectionHeadersEnabled={false}
                  renderItem={({ item }) => (
                    <CardWithCheckbox
                      value={
                        <View className="flex flex-row items-center gap-1.5">
                          <Text>{item.text}</Text>
                          <Image source={{ uri: item.icon }} height={20} width={20} />
                          {/* <SvgUri className="dark:fill-white" height={20} width={20} uri={item.icon} /> */}
                        </View>
                      }
                      isChoose={displayTextList.some(
                        (value) => typeof value === 'object' && value.text === item.text
                      )}
                      setIsChoose={(value) => setIsChoose(value, item)}
                    />
                  )}
                />
              </View>
            </ImageBackground>
          </TabsContent>
        </Tabs>
      </View>
    </SafeAreaView>
  );
}
