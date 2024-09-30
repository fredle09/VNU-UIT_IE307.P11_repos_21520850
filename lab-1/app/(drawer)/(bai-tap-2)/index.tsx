import { useState } from 'react';
import { FlatList, Image, SafeAreaView, SectionList, View } from 'react-native';

import { fruits_vegetables, workouts } from './data';

import { ExampleCardWithCheckbox } from '~/components/bai-tap-2';
import { Badge } from '~/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';

export default function BaiTap2Screen() {
  const [displayTextList, setDisplayTextList] = useState<
    (string | { icon: string; text: string })[]
  >([]);
  const [tabValue, setTabValue] = useState('workouts');

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-1 gap-2 px-4">
        <View>
          <Text className="text-3xl font-bold">Result</Text>
          <View className="border-1 flex h-36 flex-row flex-wrap gap-1.5 overflow-scroll rounded-md border-zinc-100 p-1.5 dark:border-zinc-900">
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

          <TabsContent className="relative flex-1" value="workouts">
            <FlatList
              data={workouts}
              renderItem={({ item: { type } }) => (
                <ExampleCardWithCheckbox
                  value={type}
                  isChoose={displayTextList.includes(type)}
                  setIsChoose={(value) => {
                    if (value) {
                      setDisplayTextList((prev) => [...prev, type]);
                    } else {
                      setDisplayTextList((prev) => prev.filter((value) => value !== type));
                    }
                  }}
                />
              )}
              ListHeaderComponent={<Text className="text-3xl font-bold">Workouts</Text>}
              keyExtractor={(item) => item.id}
            />
          </TabsContent>

          <TabsContent className="relative flex-1" value="fruits_vegetables">
            <SectionList
              sections={fruits_vegetables}
              keyExtractor={(item, index) => JSON.stringify(item) + index}
              ListHeaderComponent={
                <Text className="text-3xl font-bold">
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
                <ExampleCardWithCheckbox
                  value={
                    <View className="flex flex-row items-center gap-1.5">
                      <Text>{item.text}</Text>
                      <Image source={{ uri: item.icon }} height={20} width={20} />
                      {/* <SvgUri className="dark:fill-white" height={20} width={20} uri={item.icon} /> */}
                    </View>
                  }
                  isChoose={displayTextList.includes(item)}
                  setIsChoose={(value) => {
                    if (value) {
                      setDisplayTextList((prev) => [...prev, item]);
                    } else {
                      setDisplayTextList((prev) =>
                        prev.filter((value) => JSON.stringify(value) !== JSON.stringify(item))
                      );
                    }
                  }}
                />
              )}
            />
          </TabsContent>
        </Tabs>
      </View>
    </SafeAreaView>
  );
}
