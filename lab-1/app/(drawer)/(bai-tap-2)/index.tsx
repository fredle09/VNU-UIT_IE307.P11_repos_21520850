import { useState } from 'react';
import { FlatList, SectionList } from 'react-native';

import { fruits_vegetables, workouts } from './data';

import { ExampleCardWithCheckbox } from '~/components/bai-tap-2';
// import { Container } from '~/components/container';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';

export default function BaiTap2Screen() {
  const [displayText, setDisplayText] = useState('');
  // const [tabValue, setTabValue] = useState('account');

  return (
    <>
      {/* <View className="relative h-full">
        <Image
          className="absolute inset-0 object-cover"
          source={{ uri: fruits_vegetables[0].url }}
        /> */}
      {/* <NavigationContainer independent>
        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          className="mx-auto w-full max-w-[400px] flex-col gap-1.5">
          <TabsList className="w-full flex-row">
            <TabsTrigger value="account" className="flex-1">
              <Text>Account</Text>
            </TabsTrigger>
            <TabsTrigger value="password" className="flex-1">
              <Text>Password</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account"> */}
      <FlatList
        className="px-6"
        data={workouts}
        renderItem={({ item: { type } }) => (
          <ExampleCardWithCheckbox
            text={type}
            isChoose={displayText.includes(type)}
            setIsChoose={(value) => {
              if (value) {
                setDisplayText((prev) => prev + ' ' + type);
              } else {
                setDisplayText((prev) => prev.replace(type, ''));
              }
            }}
          />
        )}
        ListHeaderComponent={<Text className="text-3xl font-bold">Workouts</Text>}
        // ListEmptyComponent={ThreadPostSkeleton}
        keyExtractor={(item) => item.id}
      />
      {/* </View> */}
      {/* </TabsContent>

          <TabsContent value="password"> */}
      <SectionList
        className="mt-6 h-2/5 px-6"
        sections={fruits_vegetables}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={
          <Text className="text-3xl font-bold">
            {fruits_vegetables.map((item) => item.title).join(' ')}
          </Text>
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text className="mt-6 text-xl font-bold">{title}</Text>
        )}
        renderItem={({ item }) => (
          <ExampleCardWithCheckbox
            text={item}
            isChoose={displayText.includes(item)}
            setIsChoose={(value) => {
              if (value) {
                setDisplayText((prev) => prev + ' ' + item);
              } else {
                setDisplayText((prev) => prev.replace(item, ''));
              }
            }}
          />
        )}
      />
      {/* </TabsContent>
        </Tabs>
      </NavigationContainer> */}
    </>
  );
}

// import * as React from 'react';
// import { View } from 'react-native';

// import { Button } from '~/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '~/components/ui/card';
// import { Input } from '~/components/ui/input';
// import { Label } from '~/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
// import { Text } from '~/components/ui/text';

// export default function TabsScreen() {
//   const [value, setValue] = React.useState('account');
//   return (
//     // <NavigationContainer independent>
//     <View className="flex-1 justify-center p-6">
//       <Tabs
//         value={value}
//         onValueChange={setValue}
//         className="mx-auto w-full max-w-[400px] flex-col gap-1.5">
//         <TabsList className="w-full flex-row">
//           <TabsTrigger value="account" className="flex-1">
//             <Text>Account</Text>
//           </TabsTrigger>
//           <TabsTrigger value="password" className="flex-1">
//             <Text>Password</Text>
//           </TabsTrigger>
//         </TabsList>
//         <TabsContent value="account">
//           <Card>
//             <CardHeader>
//               <CardTitle>Account</CardTitle>
//               <CardDescription>
//                 Make changes to your account here. Click save when you're done.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="native:gap-2 gap-4">
//               <View className="gap-1">
//                 <Label nativeID="name">Name</Label>
//                 <Input aria-aria-labelledby="name" defaultValue="Pedro Duarte" />
//               </View>
//               <View className="gap-1">
//                 <Label nativeID="username">Username</Label>
//                 <Input id="username" defaultValue="@peduarte" />
//               </View>
//             </CardContent>
//             <CardFooter>
//               <Button>
//                 <Text>Save changes</Text>
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//         <TabsContent value="password">
//           <Card>
//             <CardHeader>
//               <CardTitle>Password</CardTitle>
//               <CardDescription>
//                 Change your password here. After saving, you'll be logged out.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="native:gap-2 gap-4">
//               <View className="gap-1">
//                 <Label nativeID="current">Current password</Label>
//                 <Input placeholder="********" aria-labelledby="current" secureTextEntry />
//               </View>
//               <View className="gap-1">
//                 <Label nativeID="new">New password</Label>
//                 <Input placeholder="********" aria-labelledby="new" secureTextEntry />
//               </View>
//             </CardContent>
//             <CardFooter>
//               <Button>
//                 <Text>Save password</Text>
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </View>
//     // </NavigationContainer>
//   );
// }
